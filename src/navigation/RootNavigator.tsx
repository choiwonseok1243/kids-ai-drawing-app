import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { MainTabNavigator } from './MainTabNavigator';
import { DrawingScreen } from '../screens/DrawingScreen';
import { GalleryScreen } from '../screens/GalleryScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { UploadPictureScreen } from '../screens/UploadPictureScreen';
import { PictureDetailsScreen } from '../screens/PictureDetailsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Main" 
          component={MainTabNavigator} 
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Drawing" component={DrawingScreen} />
        <Stack.Screen name="Gallery" component={GalleryScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="UploadPicture" component={UploadPictureScreen} />
        <Stack.Screen name="PictureDetails" component={PictureDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}; 