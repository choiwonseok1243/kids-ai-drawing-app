import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, SafeAreaView, Modal, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useImages } from '../contexts/ImageContext';
import { width } from '../constants/Dimensions';
import SearchBar from '../components/SearchBar';

export const CreateScreen = ({ navigation }) => {
  const { images } = useImages();
  const [guideVisible, setGuideVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSelectDrawing = (drawing) => {
    navigation.navigate('CreateDetail', { drawing });
  };

  const filteredImages = images.filter(image => 
    image.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      <View style={styles.headerRow}>
        <Text style={styles.title}>어떤 그림을 선택할까요?</Text>
        <TouchableOpacity onPress={() => setGuideVisible(true)} style={styles.guideBtn}>
          <Ionicons name="help-circle-outline" size={28} color="#7A1FA0" />
        </TouchableOpacity>
      </View>
      <Text style={styles.subtitle}>업로드한 그림으로 이야기를 만들어보세요!</Text>
      <View style={styles.searchBarWrapper}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="제목으로 검색해주세요 !"
          iconColor="#7A1FA0"
          iconSize={26}
        />
      </View>
      <Modal
        visible={guideVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setGuideVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.guideTitle}>동화 제작, 어렵지 않아요!</Text>
            <Text style={styles.guideText}>1. 업로드 하신 사진을 확인할 수 있어요.</Text>
            <Text style={styles.guideText}>2. 사진을 선택하면, 그 전에 작성하신 내용을 확인할 수 있어요.</Text>
            <Text style={styles.guideText}>3. '동화 만들러가기' 버튼을 누르면, 이야기 내용을 직접 작성할 수 있어요.</Text>
            <Text style={styles.guideText}>4. '+' 버튼을 활용해 이야기의 순서(장면)를 자유롭게 정할 수 있고, 최대 10장까지 만들 수 있어요.</Text>
            <Text style={styles.guideText}>5. 각 장면의 내용에 간략하게 이야기를 적고, '장면생성' 버튼을 누르면 AI가 멋진 장면을 만들어줘요!</Text>
            <TouchableOpacity style={styles.closeBtn} onPress={() => setGuideVisible(false)}>
              <Text style={styles.closeBtnText}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <FlatList
        data={filteredImages}
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
    paddingTop: 18,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    marginBottom: 0,
    minHeight: 40,
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
  guideBtn: {
    padding: 6,
    marginLeft: 8,
    alignSelf: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#EC913F',
    fontWeight: 'bold',
    textAlign: 'left',
    paddingHorizontal: 20,
    marginBottom: 10,
    marginTop: 4,
    fontFamily: 'BMJUA',
  },
  searchBarWrapper: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  listContainer: {
    padding: 10,
  },
  gridContainer: {
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  gridItem: {
    width: (width - 40) / 2,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageTitle: {
    fontSize: 14,
    color: '#333',
    padding: 10,
    textAlign: 'center',
    fontFamily: 'BMJUA',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    width: '90%',
    maxWidth: 400,
  },
  guideTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#7A1FA0',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'BMJUA',
  },
  guideText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 12,
    lineHeight: 24,
    fontFamily: 'BMJUA',
  },
  closeBtn: {
    backgroundColor: '#7A1FA0',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  closeBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'BMJUA',
  },
}); 