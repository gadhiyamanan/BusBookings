import React from 'react';
import HomeScreen from '../../screens/userScreens/HomeScreen';
import BookingsScreen from '../../screens/userScreens/BookingsScreen';
import HelpScreen from '../../screens/userScreens/HelpScreen';
import MyAccountScreen from '../../screens/userScreens/MyAccountScreen';
import CustomBottomTab from './CustomBottomTab';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  bookingsIcon,
  helpIcon,
  homeIcon,
  myAccountIcon,
} from '../../assets/icons';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
export default function DashBoardBottomTab() {
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
        name="bookings"
        options={{title: 'Bookings', icon: bookingsIcon}}
        component={BookingsScreen}
      />
      <Tab.Screen
        name="help"
        options={{title: 'Help', icon: helpIcon}}
        component={HelpScreen}
      />
      <Tab.Screen
        name="MyAccount"
        options={{title: 'My Account', icon: myAccountIcon}}
        component={MyAccountScreen}
      />
    </Tab.Navigator>
  );
}

