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

export function SeatComponent({isAvailable, isbooked, ischecked,seatNumber,...other}) {
  return (
    <TouchableOpacity
      style={[
        styles.seatContainer,
        {
          backgroundColor: isAvailable
            ? '#4CBB17'
            : isbooked
            ? '#707070'
            : ischecked
            ? colors.blue
            : 'white',
        },
      ]} disabled={isbooked} {...other}>
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
