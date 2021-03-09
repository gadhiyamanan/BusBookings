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
import colors from '../../constants/colors';
import {Header} from '../../components/Header';
import {RatingBar} from '../../components/RatingBar';
import {TouchableOpacity} from 'react-native-gesture-handler';
const DATA = [
  {
    title: 'ABC Transport',
    facility: 'AC&FAN | Wifi | Sleeper',
    seats: '4 seats',
    duration: '1:45hrs',
    stops: '2 stops',
    stars: 4,
    price: 2000,
  },
  {
    title: 'DEF Transport',
    facility: 'AC&FAN | Wifi | Sleeper',
    seats: '4 seats',
    duration: '1:45hrs',
    stops: '2 stops',
    stars: 3,
    price: 2500,
  },

  {
    title: 'ABC Transport',
    facility: 'AC&FAN | Wifi | Sleeper',
    seats: '4 seats',
    duration: '1:45hrs',
    stops: '2 stops',
    stars: 5,
    price: 3000,
  },
  {
    title: 'ABC Transport',
    facility: 'AC&FAN | Wifi | Sleeper',
    seats: '4 seats',
    duration: '1:45hrs',
    stops: '2 stops',
    stars: 5,
    price: 3000,
  },
];

export default function SelectBusScreen({navigation}) {
  function __onBusPress() {
    navigation.navigate('selectSeat');
  }
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => __onBusPress()}>
        <View style={styles.titleContiner}>
          <Text style={styles.title}>{item.title}</Text>
        </View>
        <View style={styles.facilityContiner}>
          <Text style={{opacity: 0.5}}>{item.facility}</Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text>{item.seats}</Text>
          <View style={styles.roundView} />
          <Text>{item.duration}</Text>
          <View style={styles.roundView} />
          <Text>{item.stops}</Text>
        </View>
        <View style={styles.raingPriceContainer}>
          <RatingBar
            getStar={(data) => null}
            ratingImageStyle={{height: 17, width: 17}}
            initial={item.stars}
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
      <Header title="Select Bus" isback/>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(__, index) => String(index)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{marginTop: 10}}
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
