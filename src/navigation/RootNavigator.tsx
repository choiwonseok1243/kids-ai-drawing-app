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
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
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
  );
}; 