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
  const [time, setTime] = useState('');
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  const handleUpload = () => {
    if (!title.trim() || !description.trim() || !time.trim()) {
      Alert.alert('알림', '제목, 내용, 시간을 모두 입력해주세요!');
      return;
    }

    onUpload({
      uri: imageUri,
      title,
      description,
      time,
    });

    Alert.alert('업로드 완료', '사진이 성공적으로 업로드되었습니다!', [
      {
        text: '확인',
        onPress: () => navigation.goBack(),
      },
    ]);
  };

  const handleDateConfirm = (date: Date) => {
    setTime(dayjs(date).format('YYYY-MM-DD'));
    setDatePickerVisible(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Image source={{ uri: imageUri }} style={styles.image} resizeMode="cover" />
          <Text style={styles.label}>제목</Text>
          <TextInput
            placeholder="제목을 입력하세요"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
            placeholderTextColor="#888"
          />
          <Text style={styles.label}>내용</Text>
          <TextInput
            placeholder="내용을 입력하세요"
            value={description}
            onChangeText={setDescription}
            style={[styles.input, { height: 100 }]}
            multiline
            placeholderTextColor="#888"
          />
          <Text style={styles.label}>날짜</Text>
          <TouchableOpacity onPress={() => setDatePickerVisible(true)} activeOpacity={0.8} style={{ width: '100%' }}>
            <TextInput
              placeholder="클릭하여 선택해주세요"
              value={time}
              style={styles.input}
              editable={false}
              pointerEvents="none"
              placeholderTextColor="#888"
            />
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={datePickerVisible}
            mode="date"
            onConfirm={handleDateConfirm}
            onCancel={() => setDatePickerVisible(false)}
            locale="ko"
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.uploadButton, { backgroundColor: '#A97AFF' }]} onPress={handleUpload} activeOpacity={0.85}>
              <Text style={[styles.uploadButtonText, { fontFamily: 'BMJUA' }]}>업로드</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
  image: {
    width: '100%',
    height: 300,
    borderRadius: 20,
    marginBottom: 20,
  },
  label: {
    alignSelf: 'flex-start',
    marginBottom: 8,
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'BMJUA',
  },
  input: {
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
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    width: '100%',
  },
});
