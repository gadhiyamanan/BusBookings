import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import {Header} from '../../components/Header';
import moment from 'moment';
export default function ReservationScreen({navigation, route}) {
  const {seatInfo}=route.params;
  console.log(seatInfo);
  return (
    <>
      <Header title="Reservation" isback />
      <View style={styles.dateContainer}>
        <Text style={{fontSize: 15}}>
          Departure Date: {moment(new Date()).format('ddd ,Do MMMM')}
        </Text>
      </View>

      <View style={styles.placeContainer}>
        <Text>
          Departure Date: {moment(new Date()).format('ddd ,Do MMMM')}
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  dateContainer: {padding: 10, justifyContent: 'center', alignItems: 'center'},
  placeContainer: {padding: 10, justifyContent: 'center', alignItems: 'center'},
});
