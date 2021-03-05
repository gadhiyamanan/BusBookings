import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SelectBusScreen from "../screens/userScreens/SelectBusScreen";
import SelectSeatScreen from "../screens/userScreens/SelectSeatScreen";
import ReservationScreen from "../screens/userScreens/ReservationScreen";
import SelectPlaceScreen from "../screens/userScreens/SelectPlaceScreen";
import DashBoardBottomTab from "./bottomTab/DashBoardBottomTab";
const Stack = createStackNavigator();
export default function DashBoardStacks() {
  return (
    <Stack.Navigator initialRouteName="dashboard">
      <Stack.Screen name="dashboard" component={DashBoardBottomTab} options= {{headerShown: false}}/>
      <Stack.Screen name="selectBus" component={SelectBusScreen} options= {{headerShown: false}}/>
      <Stack.Screen name="selectSeat" component={SelectSeatScreen} options= {{headerShown: false}}/>
      <Stack.Screen name="reservation" component={ReservationScreen} options= {{headerShown: false}}/>
      <Stack.Screen name="selectPlace" component={SelectPlaceScreen}options= {{headerShown: false}} />
    </Stack.Navigator>
  );
}
