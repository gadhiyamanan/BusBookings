import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
} from 'react-native';
import colors from '../../constants/colors';
import {Header} from '../../components/Header';
import {RatingBar} from '../../components/RatingBar';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Database from '../../functions/Database';
const DATA = [
  {
    facility: 'AC&FAN | Wifi | Sleeper',
    seats: '4 seats',
    duration: '1:45hrs',
    stops: '2 stops',
    stars: 4,
    price: 2000,
  },
  {
    facility: 'AC&FAN | Wifi | Sleeper',
    seats: '4 seats',
    duration: '1:45hrs',
    stops: '2 stops',
    stars: 3,
    price: 2500,
  },

  {
    facility: 'AC&FAN | Wifi | Sleeper',
    seats: '4 seats',
    duration: '1:45hrs',
    stops: '2 stops',
    stars: 5,
    price: 3000,
  },
  {
    facility: 'AC&FAN | Wifi | Sleeper',
    seats: '4 seats',
    duration: '1:45hrs',
    stops: '2 stops',
    stars: 5,
    price: 3000,
  },
];

export default function SelectBusScreen({navigation, route}) {
  const {resJourney, destinationCity, originCity} = route.params;
  const [busDetails, setBusDetails] = useState([]);
  useEffect(() => {
    _getData();
  }, [setBusDetails]);
  function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);

    if (h == 0 || m == 0) return m + ':' + s;
    return h + ':' + m + ':' + s;
  }
  const _getData = async () => {
    resJourney.forEach(async (child) => {
      let resRoutes = await Database.dataBaseRead(
        `route/${child.val().routeId}`,
      );
      let routeArray = resRoutes.val().place.split(',');
      let DistanceArray = resRoutes.val().distance.split(',');

      let checkOrigin = routeArray.filter((item) => item === originCity);
      let checkDestination = routeArray.filter(
        (item) => item === destinationCity,
      );
      if (checkOrigin.length !== 0 && checkDestination.length !== 0) {
        let originIndex = routeArray.findIndex((obj) => obj === checkOrigin[0]);
        let DestinationIndex = routeArray.findIndex(
          (obj) => obj === checkDestination[0],
        );

        if (
          parseInt(DistanceArray[DestinationIndex]) >
          parseInt(DistanceArray[originIndex])
        ) {
          let resBus = await Database.dataBaseRead(`bus/${child.val().busNo}`);
          let avialbaleSeats = child.val().availableSeats.split(',').length;
          let facilityRes = resBus.val().facilities.split(',');
          let facility = [];
          if (facilityRes[0] === 'Ac') {
            facility.push('Ac');
          }
          if (facilityRes[1] === 'Wifi') {
            facility.push(' | Wifi');
          }
          if (facilityRes[2] === 'Tv') {
            facility.push(' | Tv');
          }
          if (facilityRes[3] === 'Sleeper') {
            facility.push(' | Sleeper');
          }
          if (facilityRes[3] === 'Seater') {
            facility.push(' | Seater');
          }
          let duration = secondsToHms(
            DistanceArray[DestinationIndex] - DistanceArray[originIndex],
          );
          let price = Math.floor(
            (child.val().price *
              (DistanceArray[DestinationIndex] - DistanceArray[originIndex])) /
              DistanceArray[DistanceArray.length - 1],
          );
          let busDetailsArray = busDetails;
          busDetailsArray.push({
            busNo: resBus.val().busNo,
            setMap: resBus.val().seatMap,
            stops: DestinationIndex - originIndex - 1,
            seats: avialbaleSeats,
            facility: facility.toString().replace(',', ''),
            duration: duration,
            price: price,
          });
          setBusDetails(busDetailsArray);
        }
      }
    });
  };


  function __onBusPress() {
    navigation.navigate('selectSeat');
  }
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => __onBusPress()}>
        <View style={styles.titleContiner}>
          <Text style={styles.title}>S G Travels</Text>
        </View>
        <View style={styles.facilityContiner}>
          <Text style={{opacity: 0.5}}>{item.facility}</Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text>{item.seats} seats</Text>
          <View style={styles.roundView} />
          <Text>{item.duration} hrs</Text>
          <View style={styles.roundView} />
          <Text>{item.stops} stops</Text>
        </View>
        <View style={styles.raingPriceContainer}>
          <RatingBar
            getStar={(data) => null}
            ratingImageStyle={{height: 17, width: 17}}
            initial={3}
            isdisabled
          />
          <View style={styles.buttonContainer}>
            <Text style={{color: 'white'}}>₹ {item.price}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  //const [stars, setStars] = useState([]);

  return (
    <>
      <Header title="Select Bus" isback />
      <FlatList
        data={busDetails}
        renderItem={renderItem}
        keyExtractor={(__, index) => String(index)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{marginTop: 10}}
        ListFooterComponent={<View style={{height: 20}} />}
      />
    </>
  );
}

const styles = StyleSheet.create({
  ratingImage: {height: 30, width: 30},
  filled: {tintColor: '#FFDF00'},
  cardContainer: {
    height: 150,
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
  },
  titleContiner: {marginHorizontal: 15, marginTop: 15},
  title: {fontSize: 18, fontWeight: 'bold'},
  facilityContiner: {marginHorizontal: 15, marginTop: 15},
  descriptionContainer: {
    marginHorizontal: 15,
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
  raingPriceContainer: {
    alignItems: 'center',
    marginHorizontal: 15,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    height: 28,
    width: 100,
    backgroundColor: colors.blue,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
