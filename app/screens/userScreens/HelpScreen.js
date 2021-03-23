import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {Header} from '../../components/Header';
import colors from '../../constants/colors';

export default function HelpScreen() {
  const __onPhonePress = async () => {
    
    await Linking.openURL(`tel:${7284974262}`);
  };
  const __onEmailPress = async () => {
    
    await Linking.openURL(`mailto:${'gadhiyamanan18@gmail.com'}`);
  };
  return (
    <>
      <Header title="Help" />
      <View style={styles.cardContainer}>
        <View style={styles.titleContiner}>
          <Text style={styles.title}>Bus Bookings</Text>
        </View>
        <View style={styles.space} />
        <View style={{flexDirection: 'row'}}>
          <Text>Name :</Text>
          <Text> Manan Gadhiya</Text>
        </View>
        <View style={styles.space} />
        <View style={{flexDirection: 'row'}}>
          <Text>Address :</Text>
          <Text> Surat</Text>
        </View>
        <View style={styles.space} />
        <View style={{flexDirection: 'row'}}>
          <Text>Phone No. : </Text>
          <TouchableOpacity onPress={() => __onPhonePress()}>
            <Text style={{color: colors.blue}}>7284974262</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.space} />
        <View style={{flexDirection: 'row'}}>
          <Text>Mail : </Text>
          <TouchableOpacity onPress={() => __onEmailPress()}>
            <Text style={{color: colors.blue}}>gadhiyamanan18@gmail.com</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.space} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 13,
    marginHorizontal: 15,
    marginVertical: 10,
    shadowColor: '#000',
    paddingHorizontal: 15,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    backgroundColor: '#ffffff',
    elevation: 4,
  },
  space: {height: 8},
  titleContiner: {marginTop: 15},
  title: {fontSize: 18, fontWeight: 'bold', color: colors.blue},
});
