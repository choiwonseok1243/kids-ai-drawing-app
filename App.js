import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootNavigator } from './src/navigation/RootNavigator';
import { ImageProvider } from './src/contexts/ImageContext';
import { StoryProvider } from './src/contexts/StoryContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <StoryProvider>
        <ImageProvider>
          <RootNavigator />
          <StatusBar style="auto" />
        </ImageProvider>
      </StoryProvider>
    </SafeAreaProvider>
  );
} 