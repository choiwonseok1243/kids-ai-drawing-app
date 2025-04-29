import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppNavigator } from './src/navigation/AppNavigator';
import { ImageProvider } from './src/context/ImageContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <ImageProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </ImageProvider>
    </SafeAreaProvider>
  );
} 