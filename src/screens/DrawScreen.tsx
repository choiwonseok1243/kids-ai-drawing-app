import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const DrawScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>제작</Text>
      <Text style={styles.subtitle}>AI와 함께 그림을 그려보세요!</Text>
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