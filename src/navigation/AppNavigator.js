import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { CreateScreen } from '../screens/CreateScreen';
import { CreateDetailScreen } from '../screens/CreateDetailScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const CreateStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Create" 
        component={CreateScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateDetail"
        component={CreateDetailScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export const AppNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="제작" 
        component={CreateStack}
        options={{ headerShown: false }}
      />
      {/* 다른 탭 스크린들은 나중에 추가 */}
    </Tab.Navigator>
  );
}; 