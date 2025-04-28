import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const MyGalleryScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>보관함</Text>
      <Text style={styles.subtitle}>나의 작품들을 모아보세요!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
}); 