// PictureDetailsScreen.tsx
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { useImages } from '../contexts/ImageContext';

type PictureDetailsRouteProp = RouteProp<RootStackParamList, 'PictureDetails'>;

export const PictureDetailsScreen = () => {
  const route = useRoute<PictureDetailsRouteProp>();
  const { updateImage, removeImage } = useImages();
  const navigation = useNavigation();
  const { imageUri, title, description, time } = route.params;

  const [editMode, setEditMode] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);
  const [editTime, setEditTime] = useState(time);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleSave = () => {
    if (!editTitle.trim() || !editDescription.trim() || !editTime.trim()) {
      Alert.alert('알림', '제목, 내용, 날짜를 모두 입력해주세요!');
      return;
    }
    updateImage(imageUri, {
      title: editTitle,
      description: editDescription,
      time: editTime,
    });
    setEditMode(false);
    Alert.alert('저장 완료', '사진 정보가 수정되었습니다.');
  };

  const handleDelete = () => {
    removeImage(imageUri);
    setShowDeleteModal(false);
    navigation.goBack();
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={{ uri: imageUri }} style={styles.image} resizeMode="cover" />
        <Text style={styles.label}>제목</Text>
        <TextInput
          placeholder="제목을 입력하세요"
          value={editMode ? editTitle : title}
          onChangeText={setEditTitle}
          style={styles.input}
          editable={editMode}
        />
        <Text style={styles.label}>내용</Text>
        <TextInput
          placeholder="내용을 입력하세요"
          value={editMode ? editDescription : description}
          onChangeText={setEditDescription}
          style={[styles.input, { height: 100 }]}
          multiline
          editable={editMode}
        />
        <Text style={styles.label}>날짜</Text>
        <TextInput
          placeholder="예: 2025-04-29"
          value={editMode ? editTime : time}
          onChangeText={setEditTime}
          style={styles.input}
          editable={editMode}
        />
        {editMode ? (
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.buttonBase, styles.saveButton, { width: '100%' }]} onPress={handleSave}>
              <Text style={[styles.buttonTextBase, styles.saveButtonText]}>저장</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.buttonBase, styles.cancelButton, { width: '100%' }]} onPress={handleCancel}>
              <Text style={[styles.buttonTextBase, styles.cancelButtonText]}>취소</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={[styles.buttonContainer, styles.buttonRow]}>
            <TouchableOpacity style={[styles.buttonBase, styles.editButton, { flex: 1 }]} onPress={() => setEditMode(true)}>
              <Text style={[styles.buttonTextBase, styles.editButtonText]}>수정</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.buttonBase, styles.deleteButton, { flex: 1, marginLeft: 10 }]} onPress={() => setShowDeleteModal(true)}>
              <Text style={[styles.buttonTextBase, styles.deleteButtonText]}>삭제</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.buttonBase, styles.cancelButton, { flex: 1, marginLeft: 10 }]} onPress={handleCancel}>
              <Text style={[styles.buttonTextBase, styles.cancelButtonText]}>취소</Text>
            </TouchableOpacity>
          </View>
        )}
        {showDeleteModal && (
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalText}>정말 삭제하시겠어요?</Text>
              <View style={styles.modalButtonRow}>
                <TouchableOpacity style={styles.modalYesButton} onPress={handleDelete}>
                  <Text style={styles.modalYesText}>네</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalNoButton} onPress={() => setShowDeleteModal(false)}>
                  <Text style={styles.modalNoText}>아니요</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 15,
    marginBottom: 20,
    backgroundColor: '#eee',
  },
  label: {
    alignSelf: 'flex-start',
    marginBottom: 5,
    marginLeft: 5,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#7A1FA0',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    backgroundColor: '#fafafa',
  },
  buttonContainer: {
    width: '100%',
    marginTop: 10,
    borderRadius: 10,
    gap: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF8C94', // 따뜻한 핑크색
    marginTop: 10,
    textAlign: 'center',
  },
  time: {
    fontSize: 14,
    color: '#A0A0A0',
    marginTop: 5,
    marginBottom: 15,
  },
  descriptionBox: {
    backgroundColor: '#FFFAE3', // 연노랑 배경
    padding: 15,
    borderRadius: 15,
    marginTop: 10,
    width: '100%',
  },
  description: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonBase: {
    height: 48,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  buttonTextBase: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  editButton: {
    backgroundColor: '#7A1FA0',
  },
  editButtonText: {
    color: '#fff',
  },
  saveButton: {
    marginTop: 30,
    backgroundColor: '#EC913F',
  },
  saveButtonText: {
    color: '#fff',
  },
  cancelButton: {
    backgroundColor: '#F5F5F5',
  },
  cancelButtonText: {
    color: '#7A1FA0',
  },
  deleteButton: {
    backgroundColor: '#FF8C94',
  },
  deleteButtonText: {
    color: '#fff',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  modalContainer: {
    backgroundColor: '#FFF8F0',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 10,
  },
  modalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#7A1FA0',
    marginBottom: 20,
  },
  modalButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 180,
  },
  modalYesButton: {
    backgroundColor: '#7A1FA0',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 25,
    marginRight: 10,
  },
  modalYesText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalNoButton: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 25,
  },
  modalNoText: {
    color: '#7A1FA0',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 0, // gap은 RN 0.71+에서만 지원, marginLeft로 대체
  },
});
