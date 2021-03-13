import React, {useState} from 'react';
import {StyleSheet, View, Text, FlatList, TouchableOpacity} from 'react-native';
import colors from '../../constants/colors';
import {Header} from '../../components/Header';
import {RatingBar} from '../../components/RatingBar';

const DATA = [
  {
    title: 'ABC Transport',
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
    title: 'DEF Transport',
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
    title: 'ABC Transport',
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
    title: 'ABC Transport',
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
  const __onTicketPress = (item) => {
    navigation.navigate('ticketScreen', {bookedBusDetail: item});
  };
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={() => __onTicketPress(item)}>
        <View style={styles.cardContainer}>
          <View style={styles.space} />
          <Text style={styles.title}>{item.title}</Text>

          <View style={styles.space} />
          <Text style={{opacity: 0.5}}>{item.facility}</Text>

          <View style={styles.descriptionContainer}>
            <Text>{item.seats.length} seats</Text>
            <View style={styles.roundView} />
            <Text>{item.duration}</Text>
            <View style={styles.roundView} />
            <Text>{item.stops}</Text>
          </View>
          <View style={styles.space} />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <Text style={{color: colors.blue}}>
                {item.from} To {item.to}
              </Text>
            </View>

            <View>
              <Text style={{color: colors.lightblue}}>Date : {item.date}</Text>
            </View>
          </View>
          <View style={styles.space} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <Header title="Bookings" />
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(__, index) => String(index)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{marginTop: 10, marginBottom: 20}}
      />
    </>
  );
}

const styles = StyleSheet.create({
  ratingImage: {height: 30, width: 30},
  filled: {tintColor: '#FFDF00'},
  cardContainer: {
    //height: 150,
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
    backgroundColor: '#ffffff',
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
});
