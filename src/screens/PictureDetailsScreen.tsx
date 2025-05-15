import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Modal, Alert, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { MaterialIcons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { deleteImage, updateImage, ImageData } from '../api/images';

type PictureDetailsRouteProp = RouteProp<RootStackParamList, 'PictureDetails'>;
type PictureDetailsNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const PictureDetailsScreen = () => {
  const route = useRoute<PictureDetailsRouteProp>();
  const navigation = useNavigation<PictureDetailsNavigationProp>();
  const { imageUri, title: initialTitle, description: initialDescription, time: initialTime, imageData } = route.params;

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [date, setDate] = useState(() => {
    const [year, month, day] = initialTime.split('-').map(Number);
    return new Date(year, month - 1, day);
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (event.type === 'set' && selectedDate) {
      setDate(selectedDate);
    }
    setShowDatePicker(false);
  };

  const showPicker = () => {
    setShowDatePicker(true);
  };

  const handleDelete = async () => {
    try {
      if (imageData.id) {
        await deleteImage(imageData.id);
        setDeleteModalVisible(false);
        Alert.alert('삭제 완료', '이미지가 성공적으로 삭제되었습니다.');
        navigation.navigate('Home', {
          deletedImageUri: imageUri,
          action: 'delete'
        });
      } else {
        Alert.alert('오류', '이미지 정보를 찾을 수 없습니다.');
      }
    } catch (error) {
      console.error('이미지 삭제 중 오류:', error);
      Alert.alert('오류', '이미지를 삭제하는 중에 문제가 발생했습니다.');
    } finally {
      setDeleteModalVisible(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!title.trim() || !description.trim()) {
      Alert.alert('알림', '제목과 내용을 모두 입력해주세요!');
      return;
    }

    try {
      if (imageData.id) {
        const updatedData: ImageData = {
          id: imageData.id,
          uri: imageUri,
          title,
          description,
          time: formatDate(date),
        };

        await updateImage(updatedData);
        navigation.navigate('Home', {
          updatedImageData: updatedData,
          action: 'update'
        });
      } else {
        Alert.alert('오류', '이미지 정보를 찾을 수 없습니다.');
      }
    } catch (error) {
      console.error('이미지 업데이트 중 오류:', error);
      Alert.alert('오류', '이미지 정보 업데이트에 실패했습니다.');
    }
  };

  const handleCancel = () => {
    setTitle(initialTitle);
    setDescription(initialDescription);
    const [year, month, day] = initialTime.split('-').map(Number);
    setDate(new Date(year, month - 1, day));
    setIsEditing(false);
  };

  const renderDatePicker = () => {
    if (Platform.OS === 'android') {
      if (showDatePicker) {
        return (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            is24Hour={true}
            onChange={handleDateChange}
          />
        );
      }
      return null;
    }

    return (
      <Modal
        transparent={true}
        visible={showDatePicker}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.pickerHeader}>
              <TouchableOpacity 
                onPress={() => setShowDatePicker(false)}
                style={styles.pickerButton}
              >
                <Text style={styles.pickerButtonText}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => setShowDatePicker(false)}
                style={styles.pickerButton}
              >
                <Text style={[styles.pickerButtonText, { color: '#7A1FA0' }]}>확인</Text>
              </TouchableOpacity>
            </View>
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              display="spinner"
              onChange={handleDateChange}
              style={styles.datePickerIOS}
            />
          </View>
        </View>
      </Modal>
    );
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
          {isEditing ? (
            <>
              <TouchableOpacity style={styles.headerButton} onPress={handleCancel}>
                <MaterialIcons name="close" size={24} color="#666" />
                <Text style={[styles.headerButtonText, { color: '#666' }]}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerButton} onPress={handleSave}>
                <MaterialIcons name="check" size={24} color="#32CD32" />
                <Text style={[styles.headerButtonText, { color: '#32CD32' }]}>저장</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity style={styles.headerButton} onPress={handleEdit}>
              <MaterialIcons name="edit" size={24} color="#32CD32" />
              <Text style={[styles.headerButtonText, { color: '#32CD32' }]}>수정</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 80}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView 
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            bounces={true}
            keyboardShouldPersistTaps="handled"
          >
            {/* 이미지 카드 */}
            <View style={styles.imageCard}>
              <Image source={{ uri: imageUri }} style={styles.image} resizeMode="contain" />
              <Text style={styles.dateText}>{formatDate(date)}</Text>
            </View>

            {/* 텍스트 내용 */}
            <View style={styles.contentBox}>
              {isEditing ? (
                <>
                  <TextInput
                    value={title}
                    onChangeText={setTitle}
                    style={styles.titleInput}
                    placeholder="제목을 입력하세요"
                    returnKeyType="next"
                  />
                  <View style={styles.separator} />
                  <TextInput
                    value={description}
                    onChangeText={setDescription}
                    style={styles.descriptionInput}
                    multiline
                    placeholder="내용을 입력하세요"
                    textAlignVertical="top"
                    returnKeyType="next"
                  />
                  <TouchableOpacity 
                    style={styles.dateButton}
                    onPress={showPicker}
                  >
                    <Text style={styles.dateButtonText}>날짜 선택: {formatDate(date)}</Text>
                  </TouchableOpacity>

                  {renderDatePicker()}
                </>
              ) : (
                <>
                  <Text style={styles.title}>{title}</Text>
                  <View style={styles.separator} />
                  <Text style={styles.description}>{description}</Text>
                </>
              )}
            </View>
            <View style={styles.bottomPadding} />
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  bottomPadding: {
    height: 50, // 하단 여백 추가
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
    zIndex: 1, // 헤더가 항상 위에 보이도록
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
    height: undefined,
    aspectRatio: 1,
    resizeMode: 'contain',
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
    minHeight: 200, // 최소 높이 설정
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
  titleInput: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  descriptionInput: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    width: '100%',
    minHeight: 150, // 내용 입력 영역 높이 증가
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  dateButton: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  dateButtonText: {
    fontSize: 16,
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  pickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  pickerButton: {
    padding: 8,
  },
  pickerButtonText: {
    fontSize: 16,
    color: '#666',
  },
  datePickerIOS: {
    height: 200,
  },
});
