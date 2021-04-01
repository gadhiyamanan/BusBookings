import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AddBusScreen from "../screens/adminScreens/AddBusScreen";
import AdminBottomTab from './bottomTab/AdminBotttom';

const Stack = createStackNavigator();
export default function AdminBoardStack() {
  return (
    <Stack.Navigator initialRouteName="admin">
      <Stack.Screen name="admin" component={AdminBottomTab} options= {{headerShown: false}}/>
    </Stack.Navigator>
  );
}
