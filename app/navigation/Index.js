import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from "./AuthStack";
import DashBoardStack from "./DashBoardStack";
import AdminBoardStack from "./AdminBoardStack";
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from "../screens/SplashScreen";

const Stack = createStackNavigator();


export default function Index() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="splashScreen" >
      <Stack.Screen name="splashScreen" component={SplashScreen} options= {{headerShown: false}}/>
        <Stack.Screen name="authStack" component={AuthStack} options= {{headerShown: false}}/>
        <Stack.Screen name="daskBoardStack" component={DashBoardStack} options= {{headerShown: false}}/>
        <Stack.Screen name="adminBoardStack" component={AdminBoardStack} options= {{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
