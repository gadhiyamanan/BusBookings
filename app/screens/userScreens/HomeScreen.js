import React from 'react';
import { useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
  } from 'react-native';
import {Header} from "../../components/Header";
import colors from "../../constants/colors";
export default function HomeScreen() {
  useEffect(()=>{
    console.log("home Screen")
  },[])
  return (
    <>
    <Header title="Home"/>
    <View style={{height:40}}/>
   <View style={{height:150,backgroundColor:"red"}}>
      
   </View>
   </>
  );
}
