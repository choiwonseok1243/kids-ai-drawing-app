import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, Alert, FlatList, Modal, Platform } from 'react-native';
import { useNavigation, useFocusEffect, useRoute, RouteProp } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { Picker } from '@react-native-picker/picker';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

type SortOption = 'latest' | 'oldest' | 'title';

export const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<HomeScreenRouteProp>();
  const [selectedImages, setSelectedImages] = useState<{ uri: string; title: string; description: string; time: string }[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [pendingImageUri, setPendingImageUri] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>('latest');
  const [showSortPicker, setShowSortPicker] = useState(false);

  const sortImages = useCallback((images: typeof selectedImages, option: SortOption) => {
    const sorted = [...images];
    switch (option) {
      case 'latest':
        return sorted.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
      case 'oldest':
        return sorted.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
      case 'title':
        return sorted.sort((a, b) => a.title.localeCompare(b.title, 'ko'));
      default:
        return sorted;
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (route.params) {
        const { deletedImageUri, updatedImageData, action } = route.params;
        
        if (action === 'delete' && deletedImageUri) {
          setSelectedImages(prev => sortImages(prev.filter(img => img.uri !== deletedImageUri), sortOption));
          navigation.setParams({ deletedImageUri: undefined, action: undefined });
        } else if (action === 'update' && updatedImageData) {
          setSelectedImages(prev => 
            sortImages(
              prev.map(img => img.uri === updatedImageData.uri ? updatedImageData : img),
              sortOption
            )
          );
          navigation.setParams({ updatedImageData: undefined, action: undefined });
        }
      }
    }, [route.params, sortOption])
  );

  const handleSortChange = (option: SortOption) => {
    setSortOption(option);
    setSelectedImages(prev => sortImages(prev, option));
    if (Platform.OS === 'android') {
      setShowSortPicker(false);
    }
  };

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
        onUpload: handleUploadFromUploadScreen,
      });
    } else {
      Alert.alert('이미지 선택이 취소되었습니다');
    }
  };

  const handleUploadFromUploadScreen = (newData: { uri: string; title: string; description: string; time: string }) => {
    setSelectedImages(prev => sortImages([newData, ...prev], sortOption));
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
      <Text style={styles.imageDate}>{item.time}</Text>
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

      <View style={styles.sortContainer}>
        {Platform.OS === 'android' ? (
          <TouchableOpacity 
            style={styles.sortButton} 
            onPress={() => setShowSortPicker(true)}
          >
            <Text style={styles.sortButtonText}>
              {sortOption === 'latest' ? '최신순' : 
                    sortOption === 'oldest' ? '오래된순' : '제목순'}
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={sortOption}
              onValueChange={handleSortChange}
              style={styles.sortPicker}
            >
              <Picker.Item label="최신순" value="latest" />
              <Picker.Item label="오래된순" value="oldest" />
              <Picker.Item label="제목순" value="title" />
            </Picker>
          </View>
        )}
      </View>

      {/* 이미지 선택 모달 */}
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

      {/* Android 정렬 옵션 모달 */}
      {Platform.OS === 'android' && showSortPicker && (
        <Modal
          transparent={true}
          visible={showSortPicker}
          animationType="fade"
          onRequestClose={() => setShowSortPicker(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>정렬 방식</Text>
              <TouchableOpacity 
                style={styles.sortOption} 
                onPress={() => handleSortChange('latest')}
              >
                <Text style={[
                  styles.sortOptionText,
                  sortOption === 'latest' && styles.selectedSortOption
                ]}>최신순</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.sortOption}
                onPress={() => handleSortChange('oldest')}
              >
                <Text style={[
                  styles.sortOptionText,
                  sortOption === 'oldest' && styles.selectedSortOption
                ]}>오래된순</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.sortOption}
                onPress={() => handleSortChange('title')}
              >
                <Text style={[
                  styles.sortOptionText,
                  sortOption === 'title' && styles.selectedSortOption
                ]}>제목순</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.modalCancel}
                onPress={() => setShowSortPicker(false)}
              >
                <Text style={styles.modalCancelText}>닫기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      <FlatList
        data={selectedImages}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>아직 업로드된 이미지가 없습니다.</Text>
          </View>
        }
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
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 20,
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
  },
  button: {
    backgroundColor: '#7A1FA0',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '90%',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  sortContainer: {
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 6,
    paddingHorizontal: 10,
  },
  sortButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  sortButtonText: {
    color: '#7A1FA0',
    fontWeight: 'bold',
    fontSize: 14,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingLeft: 10,
  },
  pickerLabel: {
    color: '#7A1FA0',
    fontWeight: 'bold',
    fontSize: 14,
  },
  sortPicker: {
    width: 120,
    height: 40,
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
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    color: '#333',
    textAlign: 'center',
  },
  imageDate: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  emptyText: {
    color: '#666',
    fontSize: 16,
    textAlign: 'center',
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
    color: '#333',
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
    marginTop: 10,
  },
  modalCancelText: {
    color: '#333',
    fontWeight: 'bold',
  },
  sortOption: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sortOptionText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  selectedSortOption: {
    color: '#7A1FA0',
    fontWeight: 'bold',
  },
});
