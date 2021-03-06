import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
  } from 'react-native';
  import colors from "../../constants/colors";
  import {Header} from '../../components/Header';
export default function BookingsScreen() {
  return (
   <>
     <Header title="Home" isback={true}/>
       <Text>bookings Screen</Text>
   </>
  );
}
