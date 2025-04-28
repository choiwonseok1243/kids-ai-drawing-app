<<<<<<< HEAD
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, Alert, FlatList, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { useImages } from '../contexts/ImageContext';
import { Ionicons } from '@expo/vector-icons';
import SearchBar from '../components/SearchBar';
=======
import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
>>>>>>> b66f0db (Update HomeScreen with new upload image and improved layout)

const { width } = Dimensions.get('window');

export const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { images, addImage, removeImage } = useImages();
  const [modalVisible, setModalVisible] = useState(false);
  const [pendingImageUri, setPendingImageUri] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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

  const filteredImages = images.filter(image => 
    image.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    image.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
<<<<<<< HEAD
      <View style={styles.headerRow}>
        <Text style={styles.title}>{"반가워요!\n오늘은 어떤 그림을 그렸나요?"}</Text>
        <TouchableOpacity onPress={() => setIsEditMode(e => !e)} style={styles.editBtn}>
          <Ionicons name="pencil-outline" size={26} color="#7A1FA0" />
        </TouchableOpacity>
      </View>
      <Text style={styles.subtitle}>하단의 +버튼을 눌러 사진을 추가해보세요!</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={openModal}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="그림 제목이나 설명으로 검색"
        />
      </View>

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
        data={filteredImages}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
      />
=======
      <Text style={styles.title}>업로드</Text>
      <Text style={styles.subtitle}>이미지를 업로드하고 AI로 변환해보세요!</Text>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/upload.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
>>>>>>> b66f0db (Update HomeScreen with new upload image and improved layout)
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
<<<<<<< HEAD
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 0,
    backgroundColor: '#fff',
  },
  editBtn: {
    padding: 8,
  },
  textContainer: {
    display: 'none', // 기존 텍스트는 headerRow로 이동
=======
    padding: 20,
    backgroundColor: '#fff',
>>>>>>> b66f0db (Update HomeScreen with new upload image and improved layout)
  },
  title: {
    fontSize: 24,
    lineHeight: 34,
    color: '#7A1FA0',
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 16,
    color: '#EC913F',
    fontWeight: 'bold',
    textAlign: 'left',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  buttonContainer: {
    width: '90%',
    alignSelf: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#7A1FA0',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  imageContainer: {
    width: width * 0.8,
    height: width * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    padding: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageWrapper: {
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
    backgroundColor: '#f0f0f0',
  },
  imageTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
    textAlign: 'center',
  },
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
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: 3,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    width: '80%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 5
  },
  modalButton: {
    backgroundColor: '#7A1FA0',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 20,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalCancel: {
    backgroundColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  modalCancelText: {
    color: '#333',
    fontWeight: 'bold',
  },
});
