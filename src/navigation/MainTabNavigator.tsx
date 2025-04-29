import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../types/navigation';
import { HomeScreen } from '../screens/HomeScreen';
import { CreateScreen } from '../screens/CreateScreen';
import { MyGalleryScreen } from '../screens/MyGalleryScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Draw':
              iconName = focused ? 'brush' : 'brush-outline';
              break;
            case 'MyGallery':
              iconName = focused ? 'images' : 'images-outline';
              break;
            case 'Settings':
              iconName = focused ? 'settings' : 'settings-outline';
              break;
            default:
              iconName = 'help-outline';
          }

          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6200ee',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: '업로드' }}
      />
      <Tab.Screen 
        name="Draw" 
        component={CreateScreen} 
        options={{ title: '제작' }}
      />
      <Tab.Screen 
        name="MyGallery" 
        component={MyGalleryScreen} 
        options={{ title: '보관함' }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{ title: '만나러가기' }}
      />
    </Tab.Navigator>
  );
}; 