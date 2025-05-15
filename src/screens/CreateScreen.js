import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, SafeAreaView, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useImages } from '../contexts/ImageContext';
import { width } from '../constants/Dimensions';

export const CreateScreen = ({ navigation }) => {
  const { images } = useImages();
  const [guideVisible, setGuideVisible] = useState(false);

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
      <View style={styles.headerRow}>
        <Text style={styles.title}>어떤 그림을 선택할까요?</Text>
        <TouchableOpacity onPress={() => setGuideVisible(true)} style={styles.guideBtn}>
          <Ionicons name="help-circle-outline" size={28} color="#7A1FA0" />
        </TouchableOpacity>
      </View>
      <Text style={styles.subtitle}>업로드한 그림으로 이야기를 만들어보세요!</Text>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 28,
    width: '85%',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  guideTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#7A1FA0',
    marginBottom: 16,
    alignSelf: 'center',
  },
  guideText: {
    fontSize: 15,
    color: '#333',
    marginBottom: 8,
    lineHeight: 22,
  },
  closeBtn: {
    alignSelf: 'center',
    marginTop: 18,
    backgroundColor: '#7A1FA0',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 28,
  },
  closeBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 