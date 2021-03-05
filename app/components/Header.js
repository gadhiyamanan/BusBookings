import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Platform,
  Touchable,
  TouchableOpacity,
  Image,
} from 'react-native';
import {goBackIcon} from '../assets/icons/index';

import colors from '../constants/colors';

export  function Header({title,headerContainerStyle,titleTextStyle,isback,...other}) {
  return (
    <>
      <SafeAreaView style={{backgroundColor:colors.blue}} />
      <StatusBar backgroundColor={colors.blue} barStyle='light-content'/>
      <View
        style={[styles.headerContainer,{height: isback ? 64 : 97},headerContainerStyle]}>
        <Text style={[styles.titleText,titleTextStyle]}>
          {title ? title : 'set title'}
        </Text>
        {isback ? (
          <TouchableOpacity style={{position:"absolute",bottom:10,left:5,flexDirection:"row",alignItems:"center"}} {...other}>
            <Image source={goBackIcon} style={{height:22,width:22,resizeMode:"contain"}} />
            <Text style={{fontSize:17,color:"white"}}>Back</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </>
  );
}

const styles=StyleSheet.create({
    headerContainer:{backgroundColor: colors.blue,
    
    justifyContent: 'center',
    alignItems: 'center',},
    titleText:{fontSize: 27, color: 'white'}
  })
