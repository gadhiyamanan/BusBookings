import React from 'react';

import LoginScreen from "../screens/authScreens/LoginScreen";
import RegisterScreen from "../screens/authScreens/RegisterScreen";
import ResetPasswordScreen from "../screens/authScreens/ResetPasswordScreen";
import SplashScreen from "../screens/authScreens/SplashScreen";
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="login">
      <Stack.Screen name="splashScreen" component={SplashScreen} options= {{headerShown: false}}/>
      <Stack.Screen name="login" component={LoginScreen}options= {{headerShown: false}} />
      <Stack.Screen name="register" component={RegisterScreen} options= {{headerShown: false}}/>
      <Stack.Screen name="resetPassword" component={ResetPasswordScreen} options= {{headerShown: false}}/>
    </Stack.Navigator>
  );
}
