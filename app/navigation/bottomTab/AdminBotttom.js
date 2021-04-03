import React from 'react';
import HomeScreen from '../../screens//adminScreens/HomeScreen';
import ManageRoute from '../../screens/adminScreens/ManageRouteScreen';
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
import ManageBusScreen from '../../screens/adminScreens/ManageBusScreen';
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
        name="manageBus"
        options={{title: 'Manage Bus', icon: busIcon}}
        component={ManageBusScreen}
      />
      <Tab.Screen
        name="manageRoute"
        options={{title: 'Manage Route', icon: routeIcon}}
        component={ManageRoute}
      />
    </Tab.Navigator>
  );
}
