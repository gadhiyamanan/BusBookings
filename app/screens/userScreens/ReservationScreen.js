import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  FlatList,
} from 'react-native';
import {Header} from '../../components/Header';
import moment from 'moment';
import {ArrowIcon, userIcon} from '../../assets/icons';
import colors from '../../constants/colors';
import {CustomButton} from '../../components/Buttoncomponent';
import QRCode from 'react-native-qrcode-svg';
export default function ReservationScreen({navigation, route}) {
  const {seatInfo} = route.params;
  

  return (
    <>
      <Header title="Reservation" isback />
      <View style={styles.dateContainer}>
        <Text style={{fontSize: 15}}>
          Departure Date: {moment(new Date()).format('ddd ,Do MMMM')}
        </Text>
      </View>
      <View style={{height: 10}} />
      <View style={styles.placeContainer}>
        <Text style={styles.placeText}>Surat</Text>
        <View style={styles.imageContainer}>
          <Image source={ArrowIcon} style={styles.image} />
        </View>
        <Text style={styles.placeText}>Baroda</Text>
      </View>
      <View style={{height: 10}} />
      <View style={styles.thinline} />

      <View style={styles.descriptionContainer}>
        <View>
          <Text style={styles.titleText}>Bus Number</Text>
          <Text style={styles.subTitleText}>GJ05RJ3665</Text>
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <Text style={styles.titleText}>Ticket Id</Text>
          <View>
            <Text style={styles.subTitleText}>TBDL5623</Text>
          </View>
        </View>
      </View>

      <View style={styles.descriptionContainer}>
        <View>
          <Text style={styles.titleText}>Seats</Text>

          <Text style={styles.subTitleText}>{seatInfo.seats.length}</Text>
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <Text style={styles.titleText}>Seat Numbers</Text>
          <FlatList
            data={seatInfo.seats}
            renderItem={({item}) => (
              <Text style={styles.subTitleText}>{item} </Text>
            )}
            keyExtractor={(__, index) => String(index)}
            numColumns={6}
          />
        </View>
      </View>
      <View style={styles.thinline} />

      <View style={styles.descriptionContainer}>
        <View style={{flexDirection: 'row'}}>
          <Image source={userIcon} style={styles.userImage} />
          <Text style={{color: colors.blue}}>Manan Gadhiya</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.titleText}>Total Fare : </Text>
          <Text style={styles.subTitleText}>₹ {seatInfo.amount}</Text>
        </View>
      </View>
      <View style={styles.qrCodeContainer}>
        <QRCode value="Welcome" />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          title="Cancel"
          buttonContainerStyle={{flex: 1, height: 50}}
          onPress={() => navigation.navigate('selectBus')}
        />
        <View style={{width: 15}} />
        <CustomButton
          title="Book"
          buttonContainerStyle={{flex: 1, height: 50}}
        />
      </View>
      <SafeAreaView style={{marginBottom: 10}} />
    </>
  );
}

const styles = StyleSheet.create({
  dateContainer: {padding: 10, justifyContent: 'center', alignItems: 'center'},
  placeContainer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  imageContainer: {width: 80, height: 15, marginHorizontal: 10},
  image: {height: '100%', width: '100%', resizeMode: 'contain'},
  placeText: {color: colors.blue},
  thinline: {
    backgroundColor: colors.lightgrey,
    marginHorizontal: 25,
    height: 1,
  },
  descriptionContainer: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 35,
  },
  titleText: {fontSize: 12, color: colors.grey},
  subTitleText: {color: colors.blue, fontSize: 17},
  userImage: {height: 15, width: 15, resizeMode: 'contain', marginRight: 7},
  buttonContainer: {
    marginHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  qrCodeContainer: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
