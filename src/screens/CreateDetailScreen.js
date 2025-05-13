import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, FlatList, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import { colors, typography, spacing } from '../styles/theme';
import { ScrollView } from 'react-native';
import { useStories } from '../contexts/StoryContext';

export const CreateDetailScreen = ({ route, navigation }) => {
  const { drawing } = route.params;
  // 장면 리스트: [{ image, prompt, isGenerated }]
  const [scenes, setScenes] = useState([
    { image: drawing.uri, prompt: drawing.description || '', isGenerated: true },
  ]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [showStoryboard, setShowStoryboard] = useState(false);

  const flatListRef = React.useRef();
  const windowWidth = Dimensions.get('window').width;

  const { addStory } = useStories();

  // FlatList에서 스와이프 시 currentIdx 변경
  const onViewableItemsChanged = React.useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIdx(viewableItems[0].index);
    }
  }).current;

  // 화살표 버튼 핸들러
  const goPrev = () => {
    if (currentIdx > 0) {
      flatListRef.current.scrollToIndex({ index: currentIdx - 1, animated: true });
      setCurrentIdx(currentIdx - 1);
    }
  };
  const goNext = () => {
    if (currentIdx < scenes.length - 1) {
      flatListRef.current.scrollToIndex({ index: currentIdx + 1, animated: true });
      setCurrentIdx(currentIdx + 1);
    }
  };

  // 장면 추가
  const addScene = (direction) => {
    if (scenes.length >= 10) return;
    const newScene = { image: null, prompt: '', isGenerated: false };
    const idx = direction === 'left' ? currentIdx : currentIdx + 1;
    const newScenes = [...scenes];
    newScenes.splice(idx, 0, newScene);
    setScenes(newScenes);
    setCurrentIdx(idx);
  };

  // 프롬프트 입력
  const setPrompt = (text) => {
    const newScenes = [...scenes];
    newScenes[currentIdx].prompt = text;
    setScenes(newScenes);
  };

  // 장면 생성(임시)
  const generateScene = () => {
    // TODO: AI 생성 로직
    const newScenes = [...scenes];
    newScenes[currentIdx].image = 'https://via.placeholder.com/300x300?text=AI+Image';
    newScenes[currentIdx].isGenerated = true;
    setScenes(newScenes);
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  // 완료 버튼 핸들러
  const handleComplete = () => {
    const story = {
      uri: scenes[0]?.image,
      title: drawing.title,
      description: drawing.description,
      time: new Date().toISOString().slice(0, 10),
      scenes,
    };
    addStory(story);
    navigation.navigate('Main', { screen: '보관함' });
  };

  // FlatList 렌더링 항목
  const renderScene = ({ item, index }) => (
    <View style={[styles.storyContainer, { width: windowWidth }]}> 
      <Text style={styles.storyTitle}>{drawing.title}</Text>
      <Text
        style={[
          styles.sceneNumber,
          {
            paddingHorizontal: 14,
            paddingVertical: 4,
            borderRadius: 999,
            borderWidth: 2,
            borderColor: '#f9a8d4',
            backgroundColor: '#fdf2f8',
            fontWeight: 'bold',
            fontSize: 18,
            color: '#d946ef',
            alignSelf: 'center',
            marginBottom: 8,
            overflow: 'hidden',
          },
        ]}
      >
        {index + 1}
      </Text>
      <View style={styles.sceneRowWrap}>
        <View style={styles.sideBarWrap}>
          <TouchableOpacity onPress={() => addScene('left')} disabled={scenes.length >= 10} style={styles.sideAddBtn}>
            <Text style={styles.sideAddBtnText}>＋</Text>
          </TouchableOpacity>
          <View style={styles.sideBar} />
        </View>
        <View style={styles.sceneImageWrapper}>
          {item.image ? (
            <Image source={{ uri: item.image }} style={styles.sceneImage} resizeMode="cover" />
          ) : (
            <View style={styles.placeholder}><Text style={styles.placeholderText}>AI 장면 미생성</Text></View>
          )}
        </View>
        <View style={styles.sideBarWrap}>
          <TouchableOpacity onPress={() => addScene('right')} disabled={scenes.length >= 10} style={styles.sideAddBtn}>
            <Text style={styles.sideAddBtnText}>＋</Text>
          </TouchableOpacity>
          <View style={styles.sideBar} />
        </View>
      </View>
      <View style={styles.storyBtnRow}>
        {!item.isGenerated && (
          <TouchableOpacity style={styles.generateBtn} onPress={generateScene}>
            <Text style={styles.generateBtnText}>장면 생성</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  if (!showStoryboard) {
    // 1단계: 업로드 정보만 보여주기 (원래대로 복구)
    return (
      <View style={styles.container}>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{drawing.time}</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image source={{ uri: drawing.uri }} style={styles.image} resizeMode="contain" />
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.label}>제목</Text>
          <Text style={styles.infoText}>{drawing.title}</Text>
          <Text style={styles.label}>내용</Text>
          <Text style={styles.infoText}>{drawing.description}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
            <Text style={styles.buttonText}>취소</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.submitButton]} onPress={() => setShowStoryboard(true)}>
            <Text style={[styles.buttonText, styles.submitButtonText]}>동화 만들러가기</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // 동화책 스타일 스토리보드 화면
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#F7F6FB' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      {/* 우측 상단 완료 버튼 */}
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', paddingHorizontal: 18, paddingTop: 18 }}>
        <TouchableOpacity style={styles.topDoneBtn} onPress={handleComplete}>
          <Text style={styles.topDoneBtnText}>완료</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        ref={flatListRef}
        data={scenes}
        renderItem={renderScene}
        keyExtractor={(_, idx) => idx.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={currentIdx}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 60 }}
        getItemLayout={(_, index) => ({ length: windowWidth, offset: windowWidth * index, index })}
        style={{ flex: 1 }}
      />
      {/* 이야기 내용 입력란을 도트 위에 배치 */}
      <View style={styles.gradientBox}>
        <Text style={styles.gradientLabel}>이야기 내용</Text>
        <TextInput
          style={[
            styles.gradientInput,
            { minHeight: 60, maxHeight: 200, textAlignVertical: 'top' }
          ]}
          value={scenes[currentIdx].prompt}
          onChangeText={text => {
            const newScenes = [...scenes];
            newScenes[currentIdx].prompt = text;
            setScenes(newScenes);
          }}
          placeholder="이 장면의 이야기를 입력해 주세요."
          multiline
          scrollEnabled={true}
        />
      </View>
      {/* 도트와 화살표를 한 줄에 배치 */}
      <View style={styles.indexRow}>
        <TouchableOpacity style={styles.arrowBtn} onPress={goPrev} disabled={currentIdx === 0}>
          <Text style={[styles.arrowText, currentIdx === 0 && { opacity: 0.3 }]}>◀</Text>
        </TouchableOpacity>
        {scenes.map((_, idx) => (
          <TouchableOpacity key={idx} onPress={() => {
            flatListRef.current.scrollToIndex({ index: idx, animated: true });
            setCurrentIdx(idx);
          }}>
            <View style={[styles.dot, idx === currentIdx && styles.dotActive]} />
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.arrowBtn} onPress={goNext} disabled={currentIdx === scenes.length - 1}>
          <Text style={[styles.arrowText, currentIdx === scenes.length - 1 && { opacity: 0.3 }]}>▶</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 30,
  },
  dateContainer: {
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#8B4CFC',
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  dateText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  imageContainer: {
    aspectRatio: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  formContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  cancelButton: {
    backgroundColor: '#F5F5F5',
  },
  submitButton: {
    backgroundColor: '#8B4CFC',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  submitButtonText: {
    color: '#fff',
  },
  sceneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  addBtn: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8B4CFC',
    padding: 10,
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 16,
    color: '#333',
  },
  indexRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 0,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#E5E5E5',
    marginHorizontal: 5,
  },
  dotActive: {
    backgroundColor: '#8B4CFC',
  },
  generateBtn: {
    backgroundColor: '#8B4CFC',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  generateBtnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 12,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  storyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
    alignSelf: 'center',
    marginBottom: 12,
  },
  doneBtn: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#8B4CFC',
  },
  doneBtnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  sceneCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  sceneImageWrapper: {
    width: 220,
    height: 220,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E5E5',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  sceneImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  sceneNumber: {
    fontSize: 16,
    color: '#7A1FA0',
    textAlign: 'center',
    alignSelf: 'center',
    marginBottom: 12,
  },
  sideShadow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  storyBox: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  storyLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  storyContent: {
    fontSize: 16,
    color: '#333',
  },
  storyBtnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  gradientBox: {
    width: 260,
    marginTop: 0,
    marginBottom: 18,
    borderRadius: 18,
    padding: 18,
    backgroundColor: 'linear-gradient(90deg, #E0C3FC 0%, #8EC5FC 100%)',
    alignItems: 'flex-start',
    alignSelf: 'center',
    elevation: 2,
    borderWidth: 2,
    borderColor: '#A16AE8',
  },
  gradientLabel: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#A16AE8',
    marginBottom: 8,
  },
  gradientInput: {
    width: '100%',
    minHeight: 60,
    fontSize: 15,
    color: '#333',
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 30,
  },
  titleNumberWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  storyContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F7F6FB',
    paddingTop: 32,
  },
  sceneRowWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
    alignSelf: 'center',
  },
  sideBarWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 220,
    marginHorizontal: 6,
  },
  sideBar: {
    width: 6,
    height: 180,
    backgroundColor: '#E5E5E5',
    borderRadius: 3,
    marginTop: 4,
  },
  sideAddBtn: {
    marginBottom: 4,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sideAddBtnText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#8B4CFC',
  },
  arrowBtn: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.08)',
    marginHorizontal: 6,
  },
  arrowText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#7A1FA0',
  },
  topDoneBtn: {
    backgroundColor: '#8B4CFC',
    paddingVertical: 8,
    paddingHorizontal: 22,
    borderRadius: 20,
    marginLeft: 8,
    elevation: 2,
  },
  topDoneBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
}); 