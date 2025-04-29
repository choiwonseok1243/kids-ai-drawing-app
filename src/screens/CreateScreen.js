import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, SafeAreaView } from 'react-native';
import { useImages } from '../contexts/ImageContext';
import { width } from '../constants/Dimensions';

export const CreateScreen = ({ navigation }) => {
  const { images } = useImages();

  const handleSelectDrawing = (drawing) => {
    navigation.navigate('CreateDetail', { drawing });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.gridItem}
      onPress={() => handleSelectDrawing(item)}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.uri }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <Text style={styles.imageTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>어떤 그림을 선택할까요?</Text>
        <Text style={styles.subtitle}>업로드한 그림으로 이야기를 만들어보세요!</Text>
      </View>

      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        columnWrapperStyle={styles.gridContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
  },
  header: {
    alignSelf: 'stretch',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#fff',
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
  listContainer: {
    padding: 10,
  },
  gridContainer: {
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  gridItem: {
    width: width * 0.44,
    marginBottom: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    height: width * 0.4,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
    textAlign: 'center',
  },
}); 