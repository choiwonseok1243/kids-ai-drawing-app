import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, FlatList, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import { colors, typography, spacing } from '../styles/theme';
import { ScrollView } from 'react-native';
import { useStories } from '../contexts/StoryContext';
import { Ionicons } from '@expo/vector-icons';

export const CreateDetailScreen = ({ route, navigation }) => {
  const { drawing } = route.params;
  // 장면 리스트: [{ image, prompt, isGenerated }]
  const [scenes, setScenes] = useState([
    { image: drawing.uri, prompt: drawing.description || '', isGenerated: true },
  ]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [showStoryboard, setShowStoryboard] = useState(false);
  const [title, setTitle] = useState(drawing.title || '');
  const [description, setDescription] = useState(drawing.description || '');

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
      title: title,
      description: description,
      time: new Date().toISOString().slice(0, 10),
      scenes,
    };
    addStory(story);
    navigation.navigate('Main', { screen: '보관함' });
  };

  // FlatList 렌더링 항목
  const renderScene = ({ item, index }) => (
    <View style={[styles.storyContainer, { width: windowWidth }]}> 
      <Text style={styles.storyTitle}>{title}</Text>
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
            fontFamily: 'BMJUA',
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
            <View style={styles.placeholder}><Text style={styles.placeholderText}>이야기 내용을 작성 해주세요!</Text></View>
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
    // 1단계: 업로드 정보만 보여주기
    return (
      <View style={styles.container}>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{drawing.time}</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image source={{ uri: drawing.uri }} style={styles.image} resizeMode="contain" />
        </View>
        <View style={styles.formContainer}>
          <Text style={[styles.label, { fontFamily: 'BMJUA' }]}>제목</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="제목을 입력하세요"
          />
          <Text style={[styles.label, { fontFamily: 'BMJUA' }]}>내용</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="내용을 입력하세요"
            multiline
            numberOfLines={4}
          />
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

      {/* 스토리보드 */}
      <FlatList
        ref={flatListRef}
        data={scenes}
        renderItem={renderScene}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
      />

      {/* 하단 네비게이션 */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={goPrev} disabled={currentIdx === 0}>
          <Ionicons name="chevron-back" size={24} color={currentIdx === 0 ? '#ccc' : '#000'} />
        </TouchableOpacity>
        <Text style={styles.pageIndicator}>{currentIdx + 1} / {scenes.length}</Text>
        <TouchableOpacity onPress={goNext} disabled={currentIdx === scenes.length - 1}>
          <Ionicons name="chevron-forward" size={24} color={currentIdx === scenes.length - 1 ? '#ccc' : '#000'} />
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
  },
  dateContainer: {
    marginBottom: 20,
  },
  dateText: {
    fontSize: 16,
    color: '#666',
  },
  imageContainer: {
    width: '100%',
    height: 300,
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  formContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#f3f4f6',
  },
  submitButton: {
    backgroundColor: '#8b5cf6',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  submitButtonText: {
    color: '#fff',
  },
  storyContainer: {
    flex: 1,
    padding: 20,
  },
  storyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  sceneNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  sceneRowWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  sideBarWrap: {
    width: 40,
    alignItems: 'center',
  },
  sideAddBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#8b5cf6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  sideAddBtnText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  sideBar: {
    width: 2,
    flex: 1,
    backgroundColor: '#e5e7eb',
  },
  sceneImageWrapper: {
    flex: 1,
    height: 400,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f3f4f6',
  },
  sceneImage: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#666',
    fontSize: 16,
  },
  storyBtnRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  generateBtn: {
    backgroundColor: '#8b5cf6',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  generateBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  topDoneBtn: {
    backgroundColor: '#8b5cf6',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  topDoneBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  pageIndicator: {
    fontSize: 16,
    color: '#666',
  },
}); 