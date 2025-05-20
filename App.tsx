import React from 'react';
import { RootNavigator } from './src/navigation/RootNavigator';
import { AuthProvider } from './src/contexts/AuthContext';
import { ImageProvider } from './src/contexts/ImageContext';

export default function App() {
  return (
    <AuthProvider>
      <ImageProvider>
        <RootNavigator />
      </ImageProvider>
    </AuthProvider>
  );
} 