import React from 'react';
import HomeScreen from '../../screens//adminScreens/HomeScreen';
import AddBusScreen from '../../screens/adminScreens/ManageBusScreen';
import AddRouteScreen from '../../screens/adminScreens/ManageRouteScreen';
import CustomBottomTab from './CustomBottomTab';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  bookingsIcon,
    busIcon,
  helpIcon,
  homeIcon,
  myAccountIcon,
  routeIcon,
} from '../../assets/icons';
import {createStackNavigator} from '@react-navigation/stack';
const Tab = createBottomTabNavigator();
export default function AdminBottomTab() {
  return (
    <Tab.Navigator
      initialRouteName="home"
      tabBar={(props) => <CustomBottomTab {...props} />}>
      <Tab.Screen
        name="home"
        options={{title: 'Home', icon: homeIcon}}
        component={HomeScreen}
      />
      <Tab.Screen
        name="addBus"
        options={{title: 'Manage Bus', icon: busIcon}}
        component={AddBusScreen}
      />
      <Tab.Screen
        name="addRoute"
        options={{title: 'Manage Route', icon: routeIcon}}
        component={AddRouteScreen}
      />
    </Tab.Navigator>
  );
}
