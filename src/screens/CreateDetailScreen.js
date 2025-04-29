import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, ScrollView } from 'react-native';
import { colors, typography, spacing, layout } from '../styles/theme';
import { Button } from '../components/common/Button';

export const CreateDetailScreen = ({ route, navigation }) => {
  const { drawing } = route.params;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleSubmit = () => {
    // TODO: 서버에 데이터 전송 로직 추가
    console.log({ drawing, title, content });
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>이 그림으로 동화를 꾸며볼까요?</Text>
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={drawing.image}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>제목</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="동화의 제목을 입력해주세요"
            placeholderTextColor={colors.gray.medium}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>내용</Text>
          <TextInput
            style={[styles.input, styles.contentInput]}
            value={content}
            onChangeText={setContent}
            placeholder="우리가 상상한 이야기를 자유롭게 적어보세요"
            placeholderTextColor={colors.gray.medium}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="취소"
          variant="outline"
          onPress={handleCancel}
          style={styles.button}
        />
        <Button
          title="등록"
          variant="primary"
          onPress={handleSubmit}
          style={styles.button}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: spacing.md,
    marginTop: spacing.lg,
  },
  title: {
    ...typography.h1,
    color: colors.text,
    marginBottom: spacing.md,
  },
  imageContainer: {
    aspectRatio: 1,
    margin: spacing.md,
    borderRadius: layout.borderRadius,
    overflow: 'hidden',
    backgroundColor: colors.gray.light,
    ...layout.shadow,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  form: {
    padding: spacing.md,
  },
  inputContainer: {
    marginBottom: spacing.md,
  },
  label: {
    ...typography.h2,
    marginBottom: spacing.xs,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.gray.light,
    borderRadius: layout.borderRadius,
    padding: spacing.sm,
    ...typography.body,
  },
  contentInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: spacing.md,
    marginBottom: spacing.xl,
  },
  button: {
    flex: 1,
    marginHorizontal: spacing.xs,
  },
}); 