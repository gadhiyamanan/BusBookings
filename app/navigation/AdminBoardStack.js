import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AdminBottomTab from './bottomTab/AdminBotttom';
import AddEditBusScreen from '../screens/adminScreens/AddEditBusScreen';
import EditBusList from '../screens/adminScreens/EditBusList';
import AddRouteScreen from '../screens/adminScreens/AddRouteScreen';
import SelectBusScreen from '../screens/adminScreens/SelectBusScreen';
import selectRouteScreen from '../screens/adminScreens/SelectRouteScreen';

const Stack = createStackNavigator();
export default function AdminBoardStack() {
  return (
    <Stack.Navigator initialRouteName="admin">
      <Stack.Screen name="admin" component={AdminBottomTab} options= {{headerShown: false}}/>
      <Stack.Screen name="addEditBus" component={AddEditBusScreen} options= {{headerShown: false}}/>
      <Stack.Screen name="editBusList" component={EditBusList} options= {{headerShown: false}}/>
      <Stack.Screen name="addRoute" component={AddRouteScreen} options= {{headerShown: false}}/>
      <Stack.Screen name="selectBus" component={SelectBusScreen} options= {{headerShown: false}}/>
      <Stack.Screen name="selectRoute" component={selectRouteScreen} options= {{headerShown: false}}/>
    </Stack.Navigator>
  );
}
