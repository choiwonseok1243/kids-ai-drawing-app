import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, Alert, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

const { width } = Dimensions.get('window');

export const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [selectedImages, setSelectedImages] = useState<{ uri: string; title: string; description: string }[]>([]);

  const handleButtonPress = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const newImageUri = result.assets[0].uri;
      navigation.navigate('UploadPicture', {
        imageUri: newImageUri,
        onUpload: (newData: { uri: string; title: string; description: string }) => {
          setSelectedImages(prev => [newData, ...prev]); // 새 이미지를 배열의 앞에 추가
        },
      });
    } else {
      Alert.alert('이미지 선택이 취소되었습니다');
    }
  };

  const handleImagePress = (imageData: { uri: string; title: string; description: string }) => {
    navigation.navigate('PictureDetails', {
      imageUri: imageData.uri,
      title: imageData.title,
      description: imageData.description,
    });
  };

  const renderItem = ({ item }: { item: { uri: string; title: string; description: string } }) => (
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

      <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>

      <FlatList
        data={selectedImages}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}  // 한 줄에 두 개의 아이템을 나열
        columnWrapperStyle={styles.columnWrapper} // 열 간격을 설정
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
    width: width * 0.42, // 한 이미지를 2개의 열에 맞추기 위해 너비를 50%로 설정
    marginBottom: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: width * 0.4, // 이미지의 높이를 너비에 맞게 조정
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
    justifyContent: 'space-between', // 열 사이 간격 설정
    marginBottom: 20,
  },
});
