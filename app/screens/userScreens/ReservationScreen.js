import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  FlatList,
  ToastAndroid,
} from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import {Header} from '../../components/Header';
import moment from 'moment';
import {ArrowIcon, userIcon} from '../../assets/icons';
import colors from '../../constants/colors';
import {CustomButton} from '../../components/Buttoncomponent';
import QRCode from 'react-native-qrcode-svg';
import {useSelector} from 'react-redux';
import database from '@react-native-firebase/database';
import Database from '../../functions/Database';
import {LoadingBar} from '../../components/Dialog/LoadingBar';
export default function ReservationScreen({navigation, route}) {
  const {seatInfo, busDetails} = route.params;
  const userDetails = useSelector(({user}) => user.userData);
  const key = database().ref().push().key;
  const [isLoading, setIsLoading] = useState(false);
  const __bookTicket = async () => {
    var options = {
      description: 'Payment for Bus Booking',
      image: '',
      currency: 'INR',
      key: 'rzp_test_RqULCm05ouMaLI',
      amount: seatInfo.amount * 100,
      name: 'Bus Bookings.com',
      prefill: {
        email: userDetails.email,
        contact: userDetails.contactNo,
        name: userDetails.name,
      },
      // timeout:10,
      theme: {color: '#1592E6'},
    };
    RazorpayCheckout.open(options)
      .then(async (data) => {
        setIsLoading(true);
        let res = await Database.dataBaseRead(
          `journey/${moment(busDetails.busDetails.date).format('DDMMYYYY')}/${
            busDetails.busDetails.journeyId
          }`,
        );

        let availableSeats = res
          .val()
          .availableSeats.split(',')
          .map(function (item) {
            return parseInt(item);
          });
        let newAvailableSeats = availableSeats.filter(
          (n) => !seatInfo.seats.includes(n),
        );
        let newBookedSeats;
        if (res.val().bookedSeats) {
          let bookedSeats = res
            .val()
            .bookedSeats.split(',')
            .map(function (item) {
              return parseInt(item);
            })
            .sort();
          newBookedSeats = bookedSeats.concat(seatInfo.seats);
        } else {
          newBookedSeats = seatInfo.seats;
        }
        let journeyRef = `journey/${moment(busDetails.busDetails.date).format(
          'DDMMYYYY',
        )}/${busDetails.busDetails.journeyId}`;
        let journeyValue = {
          availableSeats: newAvailableSeats.toString(),
          bookedSeats: newBookedSeats.toString(),
        };

        let bookingRef = `bookings/${userDetails.userId}/${key}`;
        let bookingValue = {
          facility: busDetails.busDetails.facility,
          seats: seatInfo.seats.toString(),
          date: busDetails.busDetails.date.toString(),
          stops: busDetails.busDetails.stops,
          originCity: busDetails.busDetails.originCity,
          destinationCity: busDetails.busDetails.destinationCity,
          duration: busDetails.busDetails.duration,
          ticketId: key,
          transactionId: data.razorpay_payment_id,
          price: seatInfo.amount,
          isCancle: false,
          bookedDate: new Date(),
          busNo: busDetails.busDetails.busNo,
          journeyId:busDetails.busDetails.journeyId
        };
        await Database.databaseUpdate(journeyRef, journeyValue);
        await Database.databaseWrite(bookingRef, bookingValue);
        navigation.navigate('home');
        setIsLoading(false);
      })
      .catch((error) => {
        ToastAndroid.show("Last Transaction Not Sucessfull", ToastAndroid.LONG);
      });
  };

  return (
    <>
      <Header title="Reservation" isback />
      <LoadingBar visible={isLoading} />
      <View style={styles.dateContainer}>
        <Text style={{fontSize: 15}}>
          Departure Date:{' '}
          {moment(busDetails.busDetails.date).format('ddd ,Do MMMM')}
        </Text>
      </View>
      <View style={{height: 10}} />
      <View style={styles.placeContainer}>
        <Text style={styles.placeText}>{busDetails.busDetails.originCity}</Text>
        <View style={styles.imageContainer}>
          <Image source={ArrowIcon} style={styles.image} />
        </View>
        <Text style={styles.placeText}>
          {busDetails.busDetails.destinationCity}
        </Text>
      </View>
      <View style={{height: 10}} />
      <View style={styles.thinline} />

      <View style={styles.descriptionContainer}>
        <View>
          <Text style={styles.titleText}>Bus Number</Text>
          <Text style={[styles.subTitleText, {fontSize: 15}]}>
            {busDetails.busDetails.busNo}
          </Text>
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <Text style={styles.titleText}>Ticket Id</Text>
          <View>
            <Text style={[styles.subTitleText, {fontSize: 15}]}>{key}</Text>
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
            data={seatInfo.seats.sort()}
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
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image source={userIcon} style={styles.userImage} />
          <Text style={{color: colors.blue}}>{userDetails.name}</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.titleText}>Total Fare : </Text>
          <Text style={styles.subTitleText}>₹ {seatInfo.amount}</Text>
        </View>
      </View>
      <View style={styles.qrCodeContainer}>
        <QRCode value={JSON.stringify({busDetails, seatInfo})} />
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
          onPress={__bookTicket}
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
