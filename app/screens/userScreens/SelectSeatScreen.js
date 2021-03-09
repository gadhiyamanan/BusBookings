import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import {Header} from '../../components/Header';
import {SeatComponent} from '../../components/seatComponent';
import colors from '../../constants/colors';
import {CustomButton} from '../../components/Buttoncomponent';
export default function SelectSeatScreen() {
  return (
    <>
      <Header title="Select Seat" isback />
      <View style={styles.seatDescriptionConatiner}>
        <View style={styles.alignCenter}>
          <SeatComponent disabled isAvailable />
          <Text style={styles.imageText}>Available Seats</Text>
        </View>
        <View style={styles.alignCenter}>
          <SeatComponent disabled ischecked />
          <Text style={styles.imageText}>Selected Seats</Text>
        </View>
        <View style={styles.alignCenter}>
          <SeatComponent disabled isbooked />
          <Text style={styles.imageText}>Booked Seats</Text>
        </View>
      </View>
      <View style={{height: 20}} />
      <View style={styles.cardContainer}>
        <View style={styles.card}></View>
        <View style={{height: '100%', width: '20%'}} />
        <View style={styles.card}></View>
      </View>
    <View style={[styles.seatDescriptionConatiner]}>
        <View style={styles.alignCenter}>
          <Text style={styles.titleText} >Ticket Rate</Text>
          <Text style={styles.text}>₹ 2000</Text>
        </View>
        <View style={styles.alignCenter}>
          <Text style={styles.titleText}>No Of Seats</Text>
          <Text style={styles.text}>1</Text>
        </View>
        <View style={styles.alignCenter}>
          <Text style={styles.titleText}>Total Amount</Text>
          <Text style={styles.text}>₹ 2000</Text>
        </View>
      </View>
      <CustomButton
        title="Next"
        buttonContainerStyle={{margin: 10, height: verticalScale(50)}}
      />
      <SafeAreaView />
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 27,
    width: 27,
    resizeMode: 'contain',
  },
  titleText:{fontSize:13},
  text:{fontSize:12,opacity:0.5},
  alignCenter:{alignItems:"center"},
  imageText: {
    fontSize: 10,
    paddingTop: 5,
  },
  seatDescriptionConatiner: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    marginTop: 5,
  },
  cardContainer: {
    flex: 1,
    borderRadius: 13,
    marginHorizontal: 25,
    marginVertical: 10,
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

  card: {
    height: '100%',
    width: '40%',
  },
});
