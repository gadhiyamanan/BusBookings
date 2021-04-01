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
import colors from '../constants/colors';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';

export function SeatComponent({seatStatus,seatNumber,seatContainerStyle,...other}) {
  let bgcolor=""
  if(seatStatus===0)bgcolor=colors.green //available seat status 
  if(seatStatus===1)bgcolor=colors.darkgery//booked seat status 
  if(seatStatus===2)bgcolor=colors.blue //selected seat status 
  return (
    <TouchableOpacity
      style={[
        styles.seatContainer,
        {
          backgroundColor: bgcolor
        },
      ,seatContainerStyle]} disabled={seatStatus===1} {...other}>
      <Text style={{fontSize: scale(15), color: 'white'}}>{seatNumber}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  seatContainer: {
  
    height: scale(35),
    width: scale(35),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
});
