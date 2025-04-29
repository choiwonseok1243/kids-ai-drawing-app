import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { CreateScreen } from '../screens/CreateScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const CreateStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Create" 
        component={CreateScreen}
        options={{ 
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
};

export const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#8B4CFC',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          paddingBottom: 5,
          height: 60,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen 
        name="홈" 
        component={CreateStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="제작" 
        component={CreateStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="brush-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="보관함" 
        component={CreateStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="images-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="설정" 
        component={CreateStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}; 