import React from 'react';

import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoginScreen from '../screens/LoginScreen'

const AuthStack = createStackNavigator();
const MainScreenTab = createBottomTabNavigator();

export const RootNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{headerShown:false}}
    >
            <AuthStack.Screen name="Login" component={LoginScreen}/>
        </AuthStack.Navigator>
    )
}