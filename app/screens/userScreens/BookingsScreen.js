import React, {useState} from 'react';
import {StyleSheet, View, Text, FlatList, TouchableOpacity} from 'react-native';
import colors from '../../constants/colors';
import {Header} from '../../components/Header';
import {useFocusEffect} from '@react-navigation/native';
import Database from '../../functions/Database';
import {useSelector} from 'react-redux';
import moment from 'moment';
import {LoadingBar} from '../../components/Dialog/LoadingBar';
import {CustomButton} from '../../components/Buttoncomponent';
import auth from '@react-native-firebase/auth';
const DATA = [
  {
    facility: 'AC&FAN | Wifi | Sleeper',
    seats: '4 seats',
    duration: '1:45hrs',
    stops: '2 stops',
    stars: 4,
    price: 2000,
    from: 'Surat',
    to: 'Ahmedabad',
    date: '14/02/2021',
    seats: [1, 5],
    busNo: 'GJ05RJ2456',
    ticketId: 'HVHH231123',
    transactionId: '13354HVHH231123',
  },
  {
    facility: 'AC&FAN | Wifi | Sleeper',
    seats: '4 seats',
    duration: '1:45hrs',
    stops: '2 stops',
    stars: 3,
    price: 2500,
    date: '18/03/2021',
    from: 'Bhavnagar',
    to: 'Ahmedabad',
    seats: [1, 5, 12, 25],
    busNo: 'GJ05RJ2456',
    ticketId: 'HVHH231123',
    transactionId: '13354HVHH231123',
  },

  {
    facility: 'AC&FAN | Wifi | Sleeper',
    seats: '4 seats',
    duration: '1:45hrs',
    stops: '2 stops',
    stars: 5,
    price: 3000,
    date: '25/01/2021',
    from: 'Mehsana',
    to: 'Dahod',
    seats: [1, 5, 12, 25, 26, 34],
    busNo: 'GJ05RJ2456',
    ticketId: 'HVHH231123',
    transactionId: '13354HVHH231123',
  },
  {
    facility: 'AC&FAN | Wifi | Sleeper',
    seats: '4 seats',
    duration: '1:45hrs',
    stops: '2 stops',
    stars: 5,
    price: 3000,
    date: '10/02/2021',
    from: 'Surat',
    to: 'Patan',
    seats: [1, 5, 12, 25, 40, 26, 34, 38],
    busNo: 'GJ05RJ2456',
    ticketId: 'HVHH231123',
    transactionId: '13354HVHH231123',
  },
];

export default function BookingsScreen({navigation}) {
  const userDetails = useSelector(({user}) => user.userData);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(false);
  useFocusEffect(
    React.useCallback(() => {
      _getData();
    }, []),
  );
  const _getData = async () => {
    setIsLoading(true);
    let data = [];
    let res = await Database.dataBaseRead(`bookings/${userDetails.userId}`);

    res.forEach(async (element) => {
      let res = await Database.dataBaseRead(
        `ratings/${element.val().ticketId}`,
      );
      let stars = 0;
      if (res.val()) {
        stars = res.val().ratings;
      }

      data.push({
        facility: element.val().facility,
        seats: element
          .val()
          .seats.split(',')
          .map(function (item) {
            return parseInt(item);
          })
          .sort(),
        duration: element.val().duration,
        stops: element.val().stops,
        price: element.val().price,
        date: element.val().date,
        from: element.val().originCity,
        to: element.val().destinationCity,
        busNo: element.val().busNo,
        ticketId: element.val().ticketId,
        transactionId: element.val().transactionId,
        stars: stars,
        isCancle: element.val().isCancle,
        journeyId: element.val().journeyId,
      });
    });
    setData(data);
    
    setIsLoading(false);
  };
  const __onCancle = async (item) => {
    setIsLoading(true);
    let refDate =
      moment(item.date).format('DDMMYYYY') === 'Invalid date'
        ? moment(parseInt(item.date)).format('DDMMYYYY')
        : moment(item.date).format('DDMMYYYY');
    let res = await Database.dataBaseRead(
      `journey/${refDate}/${item.journeyId}`,
    );
    let availableSeats = res
      .val()
      .availableSeats.split(',')
      .map((item) => parseInt(item));
    let bookedSeats = res
      .val()
      .bookedSeats.split(',')
      .map((item) => parseInt(item));
    let newBookedSeats = bookedSeats.filter((n) => !item.seats.includes(n));

    let ref = `journey/${refDate}/${item.journeyId}`;
    let value = {
      availableSeats: availableSeats.concat(item.seats).sort().toString(),
      bookedSeats: newBookedSeats.toString(),
    };
    await Database.databaseUpdate(ref, value);
    await Database.databaseUpdate(
      `bookings/${auth().currentUser.uid}/${item.ticketId}`,
      {isCancle: true},
    );
    setIsLoading(false);
    _getData()
  };
  const __onTicketPress = (item) => {
    navigation.navigate('ticketScreen', {bookedBusDetail: item});
  };
  const renderItem = ({item}) => {
    return (
      <>
        <TouchableOpacity
          style={[
            styles.cardContainer,
            {
              backgroundColor:
                item.isCancle === false ? colors.white : colors.lightgrey,
            },
          ]}
          onPress={() => __onTicketPress(item)}>
          <View style={styles.space} />
          <Text style={styles.title}>S G Travels</Text>
          <View style={styles.space} />
          <Text style={{opacity: 0.5}}>{item.facility}</Text>
          <View style={styles.descriptionContainer}>
            <Text>{item.seats.length} seats</Text>
            <View style={styles.roundView} />
            <Text>{item.duration} hrs</Text>
            <View style={styles.roundView} />
            <Text>{item.stops} stops</Text>
          </View>
          <View style={styles.space} />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <Text style={{color: colors.blue}}>
                {item.from} To {item.to}
              </Text>
            </View>
            <View>
              <Text style={{color: colors.lightblue}}>
                Date :
                {moment(item.date).format('DD/MM/YYYY') === 'Invalid date'
                  ? moment(parseInt(item.date)).format('DD/MM/YYYY')
                  : moment(item.date).format('DD/MM/YYYY')}
              </Text>
            </View>
          </View>
          <View style={styles.space} />
        </TouchableOpacity>
        {!item.isCancle &&
        (moment(item.date).format('DD/MM/YYYY') === 'Invalid date'
          ? moment(new Date()).format('YYYY/MM/DD') >
            moment(parseInt(item.date)).format('YYYY/MM/DD')
            ? false
            : true
          : moment(new Date()).format('YYYY/MM/DD') >
            moment(item.date).format('YYYY/MM/DD')
          ? false
          : true) ? (
          <CustomButton
            buttonContainerStyle={styles.buttonContainerStyle}
            title="Cancle Ticket"
            onPress={() => __onCancle(item)}
          />
        ) : (
          <></>
        )}
      </>
    );
  };

  return (
    <>
      <Header title="Bookings" />
      <LoadingBar visible={isLoading} />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(__, index) => String(index)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{marginTop: 10}}
        ListFooterComponent={<View style={{height: 20}} />}
        // ListEmptyComponent={
        //   <View style={{alignItems: 'center'}}>
        //     <Text>No Bookings Found</Text>
        //   </View>
        // }
      />
    </>
  );
}

const styles = StyleSheet.create({
  ratingImage: {height: 30, width: 30},
  filled: {tintColor: '#FFDF00'},
  cardContainer: {
    borderRadius: 13,
    marginHorizontal: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    backgroundColor: colors.white,
    elevation: 4,
    paddingHorizontal: 15,
  },

  title: {fontSize: 18, fontWeight: 'bold', color: colors.blue},

  descriptionContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  roundView: {
    height: 5,
    width: 5,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 2.5,
    marginLeft: 10,
    marginRight: 5,
  },

  space: {
    height: 10,
  },
  buttonContainerStyle: {
    marginHorizontal: 15,
  },
});
