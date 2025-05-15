import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Modal, Alert } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { MaterialIcons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type PictureDetailsRouteProp = RouteProp<RootStackParamList, 'PictureDetails'>;
type PictureDetailsNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const PictureDetailsScreen = () => {
  const route = useRoute<PictureDetailsRouteProp>();
  const navigation = useNavigation<PictureDetailsNavigationProp>();
  const { imageUri, title, description, time } = route.params;

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const handleDelete = async () => {
    try {
      // 파일이 존재하는지 확인
      const fileInfo = await FileSystem.getInfoAsync(imageUri);
      
      if (fileInfo.exists) {
        // 파일 삭제
        await FileSystem.deleteAsync(imageUri);
        setDeleteModalVisible(false);
        Alert.alert('삭제 완료', '이미지가 성공적으로 삭제되었습니다.');
        // 삭제된 이미지의 URI를 HomeScreen으로 전달
        navigation.navigate('Home', {
          deletedImageUri: imageUri,
          action: 'delete'
        });
      } else {
        Alert.alert('오류', '파일을 찾을 수 없습니다.');
        setDeleteModalVisible(false);
      }
    } catch (error) {
      console.error('파일 삭제 중 오류 발생:', error);
      Alert.alert('오류', '파일을 삭제하는 중에 문제가 발생했습니다.');
      setDeleteModalVisible(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 삭제 확인 모달 */}
      <Modal
        transparent
        visible={deleteModalVisible}
        animationType="fade"
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>정말 삭제할까요?</Text>
            <Text style={styles.modalMessage}>삭제하면 복구할 수 없습니다.</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setDeleteModalVisible(false)}>
                <Text style={styles.cancelButtonText}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmButton} onPress={handleDelete}>
                <Text style={styles.confirmButtonText}>삭제</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* 상단 바 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
          <MaterialIcons name="arrow-back" size={24} color="#555" />
          <Text style={styles.headerButtonText}>뒤로</Text>
        </TouchableOpacity>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerButton} onPress={() => setDeleteModalVisible(true)}>
            <MaterialIcons name="delete" size={24} color="#FF5C5C" />
            <Text style={[styles.headerButtonText, { color: '#FF5C5C' }]}>삭제</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <MaterialIcons name="edit" size={24} color="#32CD32" />
            <Text style={[styles.headerButtonText, { color: '#32CD32' }]}>수정</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* 이미지 카드 */}
        <View style={styles.imageCard}>
          <Image source={{ uri: imageUri }} style={styles.image} resizeMode="cover" />
          <Text style={styles.dateText}>{time}</Text>
        </View>

        {/* 텍스트 내용 */}
        <View style={styles.contentBox}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.separator} />
          <Text style={styles.description}>{description}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
  },
  headerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  headerButtonText: {
    marginLeft: 5,
    fontSize: 16,
    color: '#555',
    fontWeight: '500',
  },
  headerRight: {
    flexDirection: 'row',
  },
  imageCard: {
    backgroundColor: '#f9f9f9',
    margin: 20,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 280,
  },
  dateText: {
    padding: 10,
    fontSize: 14,
    color: '#999',
    textAlign: 'right',
  },
  contentBox: {
    marginHorizontal: 20,
    padding: 20,
    backgroundColor: '#fafafa',
    borderRadius: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  // 모달 스타일
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  modalMessage: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#ddd',
    borderRadius: 10,
    marginHorizontal: 5,
  },
  confirmButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#FF5C5C',
    borderRadius: 10,
    marginHorizontal: 5,
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#333',
  },
  confirmButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});
