import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
} from 'react-native';
import {Header} from '../../components/Header';
import colors from '../../constants/colors';

export default function TicketScreen({route}) {
  const {bookedBusDetail} = route.params;
  console.log(bookedBusDetail);
  const renderItem = ({item}) => <Text style={styles.darkText}>{item} </Text>;
  return (
    <>
      <Header isback title="Ticket" />
      <View style={styles.container}>
        <View style={styles.cardContainer}>
          <View style={styles.space} />

          <View style={styles.fromToContainer}>
            <View style={styles.leftSide}>
              <Text style={styles.lightText}>From</Text>
              <Text style={styles.placeText}>{bookedBusDetail.from}</Text>
            </View>
            <View style={styles.rightSide}>
              <Text style={styles.lightText}>To</Text>
              <Text style={styles.placeText}>{bookedBusDetail.to}</Text>
            </View>
          </View>
          <View style={styles.space} />
          <View style={styles.thinline} />
          <View style={styles.space} />
          <View style={styles.descriptionContainer}>
            <View style={styles.leftSubDescriptionContainer}>
              <Text style={styles.lightText}>Date</Text>
              <Text style={styles.darkText}>{bookedBusDetail.date}</Text>
              <View style={styles.space} />
              <Text style={styles.lightText}>Seats</Text>
              <Text style={styles.dark}>{bookedBusDetail.seats.length}</Text>
              <View style={styles.space} />
              <Text style={styles.lightText}>Ticket Id</Text>
              <Text style={styles.dark}>{bookedBusDetail.ticketId}</Text>
            </View>
            <View style={styles.rightSubDescriptionContainer}>
              <Text style={styles.lightText}>Date</Text>
              <Text style={styles.darkText}>{bookedBusDetail.date}</Text>
              <View style={styles.space} />
              <Text style={styles.lightText}>Seat No</Text>
              <FlatList
                renderItem={renderItem}
                keyExtractor={(__, index) => String(index)}
                data={bookedBusDetail.seats}
                numColumns={5}
              />
              <View style={styles.space} />
              <Text style={styles.lightText}>Transaction Id</Text>
              <Text style={styles.dark}>{bookedBusDetail.transactionId}</Text>
            </View>
          </View>
          <View style={styles.space} />
          <View style={styles.roundContainer}>
          <View style={styles.leftSubDescriptionContainer}>
            <View>
              
            </View>
          </View>
        </View>
        </View>
      </View>
      <SafeAreaView style={{backgroundColor: colors.blue}} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.blue},
  cardContainer: {
    flex: 1,
    backgroundColor: colors.white,
    marginHorizontal: 35,
    marginTop: 20,
    marginBottom: 150,
    borderRadius: 15,
  },
  descriptionContainer: {
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  space: {
    height: 20,
  },
  fromToContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  lightText: {
    color: colors.lightgrey,
  },
  leftSide: {},
  rightSide: {
    alignItems: 'flex-end',
    flex: 1,
  },
  placeText: {fontSize: 15, fontWeight: 'bold', color: colors.lightblue},
  thinline: {height: 1, backgroundColor: colors.lightgrey},
  leftSubDescriptionContainer: {},
  rightSubDescriptionContainer: {
    flex: 1,

    alignItems: 'flex-end',
  },
  darkText: {},
  roundContainer:{height:25}
});
