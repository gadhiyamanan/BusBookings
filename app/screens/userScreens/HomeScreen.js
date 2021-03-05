import React from 'react';
import {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
} from 'react-native';

import { logo } from '../../assets/Images';
import {Header} from '../../components/Header';
import colors from '../../constants/colors';

export default function HomeScreen({navigation}) {
  useEffect(() => {
    console.log('home Screen');
  }, []);
  return (
    <>
      <Header title="Home" />
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={{height: 40}} />
        <View style={styles.cardContainer}>
          <View style={{flex: 1 / 2}}>
            <PlaceSelectView title="From" inputTextTitle="Origin City" onFocus={ () => {navigation.navigate("selectPlace")} } />
          </View>
          <View style={styles.thinline} />
          <View style={{flex: 1 / 2}}>
            <PlaceSelectView title="To" inputTextTitle="Destination City" onFocus={ () => {navigation.navigate("selectPlace")}}/>
          </View>
        </View>
        <View style={{height:20}}/>
        <View style={styles.cardContainer}>

        </View>
      </ScrollView>
    </>
  );
}

function PlaceSelectView({title,inputTextTitle,...other}) {
  return (
    <View style={{flexDirection: 'row', flex: 1}}>
      <View style={styles.fromToContainer}>
        <Text>{title}</Text>
      </View>
      <View style={styles.textInputContainer}>
        <TextInput placeholder={inputTextTitle} style={styles.inputStyle} placeholderTextColor="rgba(21, 146, 230, 0.5)" pla {...other}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    height: 150,
    borderRadius: 13,
    marginHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    backgroundColor: '#ffffff',
    elevation: 4,
  },
  thinline: {
    height: 1,
    backgroundColor: 'lightgrey',
    marginLeft: 15,
    marginRight: 60,
  },
  fromToContainer: {
    width: 75,
    height: '100%',
    justifyContent: 'center',
    paddingLeft: 25,
  },
  textInputContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingRight:20
  },inputStyle:{
    fontSize:20,
    //backgroundColor:"red"
  }
});
