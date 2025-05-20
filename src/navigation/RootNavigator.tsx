import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation.js';
import { MainTabNavigator } from './MainTabNavigator.js';
import { DrawingScreen } from '../screens/DrawingScreen.js';
import { GalleryScreen } from '../screens/GalleryScreen.js';
import { SettingsScreen } from '../screens/SettingsScreen.js';
import { UploadPictureScreen } from '../screens/UploadPictureScreen.js';
import { PictureDetailsScreen } from '../screens/PictureDetailsScreen.js';
import { ImageProvider } from '../contexts/ImageContext.js';
import { StoryProvider } from '../contexts/StoryContext.js';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <StoryProvider>
      <ImageProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Main"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen 
              name="Main" 
              component={MainTabNavigator} 
            />
            <Stack.Screen 
              name="Drawing" 
              component={DrawingScreen}
              options={{ headerShown: true }}
            />
            <Stack.Screen 
              name="Gallery" 
              component={GalleryScreen}
              options={{ headerShown: true }}
            />
            <Stack.Screen 
              name="Settings" 
              component={SettingsScreen}
              options={{ headerShown: true }}
            />
            <Stack.Screen 
              name="UploadPicture" 
              component={UploadPictureScreen}
              options={{ headerShown: true }}
            />
            <Stack.Screen 
              name="PictureDetails" 
              component={PictureDetailsScreen}
              options={{ headerShown: true }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ImageProvider>
    </StoryProvider>
  );
}; 