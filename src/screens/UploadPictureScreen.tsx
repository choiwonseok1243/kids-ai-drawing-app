import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Image, 
  StyleSheet, 
  KeyboardAvoidingView, 
  Platform, 
  Alert, 
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

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

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : -100}
      enabled
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={true}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.imageContainer}>
            <Image 
              source={{ uri: imageUri }} 
              style={styles.image}
              resizeMode="contain"
            />
          </View>
          <View style={styles.formContainer}>
            <Text style={styles.label}>제목</Text>
            <TextInput
              placeholder="제목을 입력하세요"
              value={title}
              onChangeText={setTitle}
              style={styles.input}
              returnKeyType="next"
            />
            <Text style={styles.label}>내용</Text>
            <TextInput
              placeholder="내용을 입력하세요"
              value={description}
              onChangeText={setDescription}
              style={[styles.input, styles.descriptionInput]}
              multiline
              textAlignVertical="top"
              returnKeyType="next"
            />
            <Text style={styles.label}>날짜</Text>
            <TextInput
              placeholder="예: 2025-04-29"
              value={time}
              onChangeText={setTime}
              style={styles.input}
              returnKeyType="done"
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={styles.uploadButton}
                onPress={handleUpload}
                activeOpacity={0.8}
              >
                <Text style={styles.uploadButtonText}>업로드</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={[
            styles.bottomPadding,
            Platform.OS === 'android' && { height: 80 }  // Android에서 하단 여백 증가
          ]} />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  formContainer: {
    width: '100%',
    alignItems: 'stretch',
  },
  imageContainer: {
    width: '100%',
    height: 300,
    backgroundColor: '#f5f5f5',
    borderRadius: 15,
    marginVertical: 20,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
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
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    backgroundColor: '#fafafa',
  },
  descriptionInput: {
    height: 150,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 20,
    marginTop: 10,
  },
  uploadButton: {
    backgroundColor: '#7A1FA0',
    paddingVertical: 16,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  uploadButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomPadding: {
    height: 50,
  },
});


