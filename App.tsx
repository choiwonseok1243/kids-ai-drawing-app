import React from 'react';
import { RootNavigator } from './src/navigation/RootNavigator';
import { AuthProvider } from './src/contexts/AuthContext';
import { ImageProvider } from './src/contexts/ImageContext';
import { Text } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

export default function App() {
  const [fontsLoaded] = Font.useFonts({
    'BMJUA': require('./assets/fonts/BMJUA.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  if ((Text as any).defaultProps == null) (Text as any).defaultProps = {};
  (Text as any).defaultProps.style = { fontFamily: 'Gaegu' };

  return (
    <AuthProvider>
      <ImageProvider>
        <RootNavigator />
      </ImageProvider>
    </AuthProvider>
  );
}