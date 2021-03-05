import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AddBusScreen from "../screens/adminScreens/AddBusScreen";

const Stack = createStackNavigator();
export default function AdminBoardStack() {
  return (
    <Stack.Navigator initialRouteName="addbus">
      <Stack.Screen name="addbus" component={AddBusScreen} options= {{headerShown: false}}/>
    </Stack.Navigator>
  );
}
