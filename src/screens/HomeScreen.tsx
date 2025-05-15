import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, Alert, FlatList, Modal } from 'react-native';
import { useNavigation, useFocusEffect, useRoute, RouteProp } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

const { width } = Dimensions.get('window');

type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

export const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<HomeScreenRouteProp>();
  const [selectedImages, setSelectedImages] = useState<{ uri: string; title: string; description: string; time: string }[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [pendingImageUri, setPendingImageUri] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      if (route.params) {
        const { deletedImageUri, updatedImageData, action } = route.params;
        
        if (action === 'delete' && deletedImageUri) {
          setSelectedImages(prev => prev.filter(img => img.uri !== deletedImageUri));
          navigation.setParams({ deletedImageUri: undefined, action: undefined });
        } else if (action === 'update' && updatedImageData) {
          setSelectedImages(prev => 
            prev.map(img => 
              img.uri === updatedImageData.uri ? updatedImageData : img
            )
          );
          navigation.setParams({ updatedImageData: undefined, action: undefined });
        }
      }
    }, [route.params])
  );

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
      setPendingImageUri(newImageUri); // 일단 임시 저장
      closeModal();
      navigation.navigate('UploadPicture', {
        imageUri: newImageUri,
        onUpload: handleUploadFromUploadScreen, // 고정된 핸들러 넘기기
      });
    } else {
      Alert.alert('이미지 선택이 취소되었습니다');
    }
  };

  const handleUploadFromUploadScreen = (newData: { uri: string; title: string; description: string; time: string }) => {
    setSelectedImages(prev => [newData, ...prev]);
  };

  const handleImagePress = (imageData: { uri: string; title: string; description: string; time: string }) => {
    navigation.navigate('PictureDetails', {
      imageUri: imageData.uri,
      title: imageData.title,
      description: imageData.description,
      time: imageData.time,
    });
  };

  const renderItem = ({ item }: { item: { uri: string; title: string; description: string; time: string } }) => (
    <TouchableOpacity onPress={() => handleImagePress(item)} style={styles.imageWrapper}>
      <Image source={{ uri: item.uri }} style={styles.image} resizeMode="cover" />
      <Text style={styles.imageTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{"반가워요!\n오늘은 어떤 그림을 그렸나요?"}</Text>
        <Text style={styles.subtitle}>하단의 +버튼을 눌러 사진을 추가해보세요!</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={openModal}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>

      {/* 모달 */}
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
        data={selectedImages}
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
    paddingTop: 40,
    backgroundColor: '#fff',
  },
  textContainer: {
    alignSelf: 'stretch',
    paddingHorizontal: 20,
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
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#7A1FA0',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '90%',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  imageWrapper: {
    width: width * 0.42,
    marginBottom: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    aspectRatio: 0.8,
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    borderRadius: 10,
  },
  imageTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
    textAlign: 'center',
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 20,
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
