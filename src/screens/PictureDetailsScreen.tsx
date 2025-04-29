// PictureDetailsScreen.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';

type PictureDetailsRouteProp = RouteProp<RootStackParamList, 'PictureDetails'>;

export const PictureDetailsScreen = () => {
  const route = useRoute<PictureDetailsRouteProp>();
  const { imageUri, title, description, time } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageWrapper}>
        <Image source={{ uri: imageUri }} style={styles.image} resizeMode="cover" />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.time}>{time}</Text>
      <View style={styles.descriptionBox}>
        <Text style={styles.description}>{description}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#FFF8F0', // 밝은 크림색 배경
  },
  imageWrapper: {
    backgroundColor: '#FFE4E1', // 연한 핑크색
    padding: 10,
    borderRadius: 20,
    marginBottom: 20,
    elevation: 5, // 안드로이드 그림자
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  image: {
    width: 280,
    height: 280,
    borderRadius: 20,
    backgroundColor: '#eee',
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
});
