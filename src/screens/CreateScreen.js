import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useImages } from '../contexts/ImageContext';

export const CreateScreen = ({ navigation }) => {
  const { images } = useImages();

  const handleSelectDrawing = (drawing) => {
    navigation.navigate('CreateDetail', { drawing });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>어떤 그림을 선택할까요?</Text>
        <Text style={styles.subtitle}>업로드한 그림으로 이야기를 만들어보세요!</Text>
      </View>

      <View style={styles.gridContainer}>
        {images.map((image, index) => (
          <TouchableOpacity
            key={index}
            style={styles.gridItem}
            onPress={() => handleSelectDrawing(image)}
          >
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: image.uri }}
                style={styles.image}
                resizeMode="cover"
              />
            </View>
            <Text style={styles.imageTitle}>{image.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    paddingTop: 40,
  },
  header: {
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
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '48%',
    marginBottom: 16,
  },
  imageContainer: {
    aspectRatio: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageTitle: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
    color: '#333',
  },
}); 