import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, Alert, FlatList, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { useImages } from '../contexts/ImageContext';
import { Ionicons } from '@expo/vector-icons';
<<<<<<< HEAD
import SearchBar from '../components/SearchBar';
=======
>>>>>>> f4729b6 (feat: 업로드 탭 썸네일 표시 문제 해결 및 UI/UX 개선)

const { width } = Dimensions.get('window');

export const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { images, addImage, removeImage } = useImages();
  const [modalVisible, setModalVisible] = useState(false);
  const [pendingImageUri, setPendingImageUri] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
<<<<<<< HEAD
  const [searchQuery, setSearchQuery] = useState('');
  const [sortType, setSortType] = useState<'latest' | 'oldest' | 'title'>('latest');
  const [sortModalVisible, setSortModalVisible] = useState(false);
=======
>>>>>>> f4729b6 (feat: 업로드 탭 썸네일 표시 문제 해결 및 UI/UX 개선)

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const handleButtonPress = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const newImageUri = result.assets[0].uri;
      setPendingImageUri(newImageUri);
      closeModal();
      navigation.navigate('UploadPicture', {
        imageUri: newImageUri,
        onUpload: addImage,
      });
    } else {
      Alert.alert('이미지 선택이 취소되었습니다');
    }
  };

  const handleImagePress = (imageData: { uri: string; title: string; description: string; time: string }) => {
    if (isEditMode) return;
    navigation.navigate('PictureDetails', {
      imageUri: imageData.uri,
      title: imageData.title,
      description: imageData.description,
      time: imageData.time,
    });
  };

  const handleDelete = (uri: string) => {
    Alert.alert('삭제 확인', '정말 삭제하시겠어요?', [
      { text: '취소', style: 'cancel' },
      { text: '삭제', style: 'destructive', onPress: () => removeImage(uri) },
    ]);
  };

<<<<<<< HEAD
  const filteredImages = images.filter(image => 
    image.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    image.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedImages = React.useMemo(() => {
    switch (sortType) {
      case 'latest':
        return [...filteredImages].sort((a, b) => b.time.localeCompare(a.time));
      case 'oldest':
        return [...filteredImages].sort((a, b) => a.time.localeCompare(b.time));
      case 'title':
        return [...filteredImages].sort((a, b) => a.title.localeCompare(b.title));
      default:
        return filteredImages;
    }
  }, [filteredImages, sortType]);

=======
>>>>>>> f4729b6 (feat: 업로드 탭 썸네일 표시 문제 해결 및 UI/UX 개선)
  const renderItem = ({ item }: { item: { uri: string; title: string; description: string; time: string } }) => (
    <View style={styles.imageWrapper}>
      <TouchableOpacity onPress={() => handleImagePress(item)} disabled={isEditMode}>
        <Image source={{ uri: item.uri }} style={styles.image} resizeMode="cover" />
        <Text style={styles.imageTitle}>{item.title}</Text>
      </TouchableOpacity>
      {isEditMode && (
        <TouchableOpacity style={styles.deleteBtn} onPress={() => handleDelete(item.uri)}>
          <Ionicons name="remove-circle" size={32} color="#FF8C94" />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{"반가워요!\n오늘은 어떤 그림을 그렸나요?"}</Text>
        <TouchableOpacity onPress={() => setIsEditMode(e => !e)} style={styles.editBtn}>
          <Ionicons name="pencil-outline" size={26} color="#7A1FA0" />
        </TouchableOpacity>
<<<<<<< HEAD
      </View>
      <Text style={styles.subtitle}>하단의 +버튼을 눌러 사진을 추가해보세요!</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={openModal}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="제목으로 검색해주세요 !"
        />
=======
>>>>>>> f4729b6 (feat: 업로드 탭 썸네일 표시 문제 해결 및 UI/UX 개선)
      </View>
      <Text style={styles.subtitle}>하단의 +버튼을 눌러 사진을 추가해보세요!</Text>

      <View style={{ alignItems: 'flex-end', width: '90%', alignSelf: 'center', marginBottom: 10 }}>
        <TouchableOpacity
          style={{ backgroundColor: '#f5f5f5', borderRadius: 8, paddingVertical: 6, paddingHorizontal: 18 }}
          onPress={() => setSortModalVisible(true)}
        >
          <Text style={{ color: '#7A1FA0', fontWeight: 'bold', fontSize: 16, fontFamily: 'BMJUA' }}>
            {sortType === 'latest' ? '최신순' : sortType === 'oldest' ? '오래된순' : '제목순'}
          </Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={sortModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setSortModalVisible(false)}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'white', borderRadius: 18, padding: 24, width: '80%', alignItems: 'center' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 18, fontFamily: 'BMJUA' }}>정렬 방식</Text>
            <TouchableOpacity onPress={() => { setSortType('latest'); setSortModalVisible(false); }} style={{ paddingVertical: 10, width: '100%' }}>
              <Text style={{ color: sortType === 'latest' ? '#7A1FA0' : '#333', fontWeight: sortType === 'latest' ? 'bold' : 'normal', fontSize: 18, textAlign: 'center', fontFamily: 'BMJUA' }}>최신순</Text>
            </TouchableOpacity>
            <View style={{ height: 1, backgroundColor: '#eee', width: '100%' }} />
            <TouchableOpacity onPress={() => { setSortType('oldest'); setSortModalVisible(false); }} style={{ paddingVertical: 10, width: '100%' }}>
              <Text style={{ color: sortType === 'oldest' ? '#7A1FA0' : '#333', fontWeight: sortType === 'oldest' ? 'bold' : 'normal', fontSize: 18, textAlign: 'center', fontFamily: 'BMJUA' }}>오래된순</Text>
            </TouchableOpacity>
            <View style={{ height: 1, backgroundColor: '#eee', width: '100%' }} />
            <TouchableOpacity onPress={() => { setSortType('title'); setSortModalVisible(false); }} style={{ paddingVertical: 10, width: '100%' }}>
              <Text style={{ color: sortType === 'title' ? '#7A1FA0' : '#333', fontWeight: sortType === 'title' ? 'bold' : 'normal', fontSize: 18, textAlign: 'center', fontFamily: 'BMJUA' }}>제목순</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSortModalVisible(false)} style={{ marginTop: 18, backgroundColor: '#eee', borderRadius: 8, paddingVertical: 8, paddingHorizontal: 32, alignSelf: 'center' }}>
              <Text style={{ color: '#333', fontWeight: 'bold', fontSize: 16, fontFamily: 'BMJUA' }}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>이미지 선택</Text>
            <TouchableOpacity onPress={handleButtonPress} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>이미지 선택하기</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={closeModal} style={styles.modalCancel}>
              <Text style={styles.modalCancelText}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <FlatList
        data={sortedImages}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
<<<<<<< HEAD
    paddingTop: 20,
    marginBottom: 0,
    minHeight: 40,
=======
    paddingTop: 40,
    paddingBottom: 0,
    backgroundColor: '#fff',
>>>>>>> dd8fff5 (UI 개선: 네비게이션 헤더 제거, 탭바 아이콘 변경(업로드/만나러가기), 탭바 아이콘(26) 및 텍스트(13) 크기 조정)
  },
  editBtn: {
    padding: 8,
  },
  textContainer: {
    display: 'none', // 기존 텍스트는 headerRow로 이동
  },
  title: {
    flex: 1,
    fontSize: 24,
    lineHeight: 34,
    color: '#7A1FA0',
    fontWeight: 'bold',
    marginBottom: 0,
    textAlign: 'left',
    fontFamily: 'BMJUA',
  },
  editBtn: {
    padding: 6,
    marginLeft: 8,
    alignSelf: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#EC913F',
    fontWeight: 'bold',
    textAlign: 'left',
<<<<<<< HEAD
<<<<<<< HEAD
    paddingHorizontal: 20,
    marginBottom: 10,
    marginTop: 4,
    fontFamily: 'BMJUA',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
=======
>>>>>>> dd8fff5 (UI 개선: 네비게이션 헤더 제거, 탭바 아이콘 변경(업로드/만나러가기), 탭바 아이콘(26) 및 텍스트(13) 크기 조정)
=======
    paddingHorizontal: 20,
    marginBottom: 10,
>>>>>>> f4729b6 (feat: 업로드 탭 썸네일 표시 문제 해결 및 UI/UX 개선)
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#7A1FA0',
<<<<<<< HEAD
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
=======
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '90%',
    marginBottom: 20,
    alignSelf: 'center',
>>>>>>> dd8fff5 (UI 개선: 네비게이션 헤더 제거, 탭바 아이콘 변경(업로드/만나러가기), 탭바 아이콘(26) 및 텍스트(13) 크기 조정)
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  imageWrapper: {
<<<<<<< HEAD
    width: (width - 40) / 2,
    marginBottom: 20,
    position: 'relative',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 12,
=======
    width: width * 0.46,
    marginBottom: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: 10,
<<<<<<< HEAD
>>>>>>> dd8fff5 (UI 개선: 네비게이션 헤더 제거, 탭바 아이콘 변경(업로드/만나러가기), 탭바 아이콘(26) 및 텍스트(13) 크기 조정)
=======
    backgroundColor: '#f0f0f0',
>>>>>>> f4729b6 (feat: 업로드 탭 썸네일 표시 문제 해결 및 UI/UX 개선)
  },
  imageTitle: {
    fontSize: 14,
    color: '#333',
    marginTop: 8,
    textAlign: 'center',
    fontFamily: 'BMJUA',
  },
<<<<<<< HEAD
<<<<<<< HEAD
  deleteBtn: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: '#fff',
    borderRadius: 16,
=======
=======
  deleteBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 10,
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#eee',
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
>>>>>>> f4729b6 (feat: 업로드 탭 썸네일 표시 문제 해결 및 UI/UX 개선)
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: 3,
>>>>>>> dd8fff5 (UI 개선: 네비게이션 헤더 제거, 탭바 아이콘 변경(업로드/만나러가기), 탭바 아이콘(26) 및 텍스트(13) 크기 조정)
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    fontFamily: 'BMJUA',
  },
  modalButton: {
    backgroundColor: '#7A1FA0',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 12,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'BMJUA',
  },
  modalCancel: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  modalCancelText: {
    color: '#666',
    fontSize: 16,
    fontFamily: 'BMJUA',
  },
});
