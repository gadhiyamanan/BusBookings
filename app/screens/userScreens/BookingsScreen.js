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
export default function BookingsScreen() {
  return (
   <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:colors.lightblue}}>
       <Text>bookings Screen</Text>
   </View>
  );
}
