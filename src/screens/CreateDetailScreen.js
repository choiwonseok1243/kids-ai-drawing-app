import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { colors, typography, spacing } from '../styles/theme';

export const CreateDetailScreen = ({ route, navigation }) => {
  const { drawing } = route.params;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleSubmit = () => {
    // TODO: AI 그림 생성 로직 구현
    console.log('Creating AI drawing with:', { title, description });
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={drawing.image} style={styles.image} resizeMode="contain" />
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.label}>제목</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="제목을 입력하세요"
        />

        <Text style={styles.label}>내용</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={description}
          onChangeText={setDescription}
          placeholder="내용을 입력하세요"
          multiline
          numberOfLines={4}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
          <Text style={styles.buttonText}>취소</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.submitButton]} onPress={handleSubmit}>
          <Text style={[styles.buttonText, styles.submitButtonText]}>등록</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  imageContainer: {
    aspectRatio: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  formContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  cancelButton: {
    backgroundColor: '#F5F5F5',
  },
  submitButton: {
    backgroundColor: '#8B4CFC',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  submitButtonText: {
    color: '#fff',
  },
}); 