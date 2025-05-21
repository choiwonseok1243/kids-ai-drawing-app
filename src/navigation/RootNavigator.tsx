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
import { CreateDetailScreen } from '../screens/CreateDetailScreen';
import { ImageProvider } from '../contexts/ImageContext';
import { StoryProvider } from '../contexts/StoryContext';
import { StoryPlayerScreen } from '../screens/StoryPlayerScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <StoryProvider>
      <ImageProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Login"
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
            <Stack.Screen 
              name="CreateDetail" 
              component={CreateDetailScreen}
              options={{ headerShown: true }}
            />
            <Stack.Screen 
              name="StoryPlayer" 
              component={StoryPlayerScreen}
              options={{ headerShown: true }}
            />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ImageProvider>
    </StoryProvider>
  );
}; 