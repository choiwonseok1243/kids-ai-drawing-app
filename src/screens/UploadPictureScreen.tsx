// UploadPictureScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, KeyboardAvoidingView, Platform, Alert, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

export const UploadPictureScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { imageUri, onUpload } = route.params as {
    imageUri: string;
    onUpload: (data: { uri: string; title: string; description: string; time: string }) => void;
  };

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  dayjs.locale('ko');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const formatDate = (date: Date) => dayjs(date).format('YYYY년 M월 D일 (dd)');

  const handleUpload = () => {
    if (!title.trim() || !description.trim()) {
      Alert.alert('알림', '제목, 내용, 날짜를 모두 입력해주세요!');
      return;
    }

    onUpload({
      uri: imageUri,
      title,
      description,
      time: formatDate(date),
    });

    Alert.alert('업로드 완료', '사진이 성공적으로 업로드되었습니다!', [
      {
        text: '확인',
        onPress: () => navigation.goBack(),
      },
    ]);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <View style={{ flex: 1 }}>
          <ScrollView
            contentContainerStyle={[styles.container, { flexGrow: 1, justifyContent: 'flex-start', paddingBottom: 0 }]}
            keyboardShouldPersistTaps="handled"
          >
            <Image source={{ uri: imageUri }} style={styles.bigImage} resizeMode="contain" />
            <Text style={[styles.bigLabel, { color: '#A97AFF', fontFamily: 'BMJUA' }]}>제목</Text>
            <TextInput
              placeholder="제목을 입력해주세요"
              placeholderTextColor="#333"
              value={title}
              onChangeText={setTitle}
              style={[styles.bigInput, { backgroundColor: '#F5F5F5', color: '#333', fontFamily: 'BMJUA' }]}
            />
            <Text style={[styles.bigLabel, { color: '#A97AFF', fontFamily: 'BMJUA' }]}>내용</Text>
            <TextInput
              placeholder="내용을 입력해주세요"
              placeholderTextColor="#333"
              value={description}
              onChangeText={setDescription}
              style={[styles.bigInput, { height: 120, backgroundColor: '#F5F5F5', color: '#333', fontFamily: 'BMJUA' }]}
              multiline
            />
            <Text style={[styles.bigLabel, { color: '#A97AFF', fontFamily: 'BMJUA' }]}>날짜</Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={[styles.bigInput, { backgroundColor: '#F5F5F5' }]}> 
              <Text style={{ color: '#333', fontFamily: 'BMJUA' }}>{formatDate(date)}</Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={showDatePicker}
              mode="date"
              date={date}
              maximumDate={new Date()}
              onConfirm={selectedDate => {
                setShowDatePicker(false);
                setDate(selectedDate);
              }}
              onCancel={() => setShowDatePicker(false)}
              locale="ko"
              confirmTextIOS="확인"
              cancelTextIOS="취소"
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={[styles.uploadButton, { backgroundColor: '#A97AFF' }]} onPress={handleUpload} activeOpacity={0.85}>
                <Text style={[styles.uploadButtonText, { fontFamily: 'BMJUA' }]}>업로드</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  bigImage: {
    width: '100%',
    height: 300,
    borderRadius: 20,
    marginBottom: 20,
  },
  bigLabel: {
    alignSelf: 'flex-start',
    marginBottom: 8,
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'BMJUA',
  },
  bigInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    width: '100%',
    marginBottom: 15,
    fontSize: 16,
    fontFamily: 'BMJUA',
  },
  buttonContainer: {
    width: '100%',
    marginTop: 20,
    alignItems: 'center',
  },
  uploadButton: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
  },
  uploadButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: 'BMJUA',
  },
});
