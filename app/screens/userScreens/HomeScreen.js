import React from 'react';
import {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {calenderIcon} from '../../assets/icons';
import moment from 'moment';
import {Header} from '../../components/Header';
import colors from '../../constants/colors';
import {CustomButton} from '../../components/Buttoncomponent';
import {CalenderPicker} from '../../components/Dialog/calenderPickerComponent';
export default function HomeScreen({navigation}) {
  useEffect(() => {
    console.log('home Screen');
  }, []);
  const [originCity, setOriginCity] = useState();
  const [destinationCity, setDestinationCity] = useState();
  const [isCalendeShow, setIsCalenderShow] = useState(false);
  const [date, setDate] = useState(new Date());
  function __onSeachBusPress() {
    navigation.navigate('selectBus');
  }
  return (
    <>
      <CalenderPicker
        isModalVisible={isCalendeShow}
        onDayPress={(day) => {
          console.log('selected day', day);
          setDate(day.timestamp);
          setIsCalenderShow(false);
        }}
      />
      <Header title="Home" />
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={{height: 40}} />
        <View style={styles.cardContainer}>
          <View style={{flex: 1 / 2}}>
            <PlaceSelectView
              title="From"
              value={originCity}
              inputTextTitle="Origin City"
              onFocus={() => {
                navigation.navigate('selectPlace', {
                  title: 'Origin City',
                  setCity: (data) => {
                    setOriginCity(data);
                  },
                });
              }}
            />
          </View>
          <View style={styles.thinline} />
          <View style={{flex: 1 / 2}}>
            <PlaceSelectView
              title="To"
              value={destinationCity}
              inputTextTitle="Destination City"
              onFocus={() => {
                navigation.navigate('selectPlace', {
                  title: 'Destination City',
                  setCity: (data) => {
                    setDestinationCity(data);
                  },
                });
              }}
            />
          </View>
        </View>
        <View style={{height: 20}} />
        <View style={[styles.cardContainer, {height: 100}]}>
          <View style={{paddingLeft: 25, paddingTop: 10}}>
            <Text>Departure Date</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
            <TouchableOpacity
              style={styles.calenderImageContainer}
              onPress={() => {
                setIsCalenderShow(true);
              }}>
              <Image source={calenderIcon} style={styles.calenderImage} />
            </TouchableOpacity>
            <View style={styles.calendar}>
              <View>
                <Text style={styles.dateText}>
                  {moment(date).format('Do MMMM')}
                </Text>
              </View>
              <View>
                <Text style={styles.dateText}>
                  {moment(date).calendar({
                    sameDay: '[Today]',
                    nextDay: '[Tomorrow]',
                    nextWeek: 'dddd',
                    sameElse: 'L',
                  })}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{height: 20}} />
        <CustomButton
          title="Search Buses"
          buttonContainerStyle={{marginHorizontal: 15}}
          onPress={() => __onSeachBusPress()}
        />
      </ScrollView>
    </>
  );
}

function PlaceSelectView({title, inputTextTitle, ...other}) {
  return (
    <View style={{flexDirection: 'row', flex: 1}}>
      <View style={styles.fromToContainer}>
        <Text>{title}</Text>
      </View>
      <View style={styles.textInputContainer}>
        <TextInput
          placeholder={inputTextTitle}
          style={styles.inputStyle}
          placeholderTextColor="rgba(21, 146, 230, 0.5)"
          pla
          {...other}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    height: 150,
    borderRadius: 13,
    marginHorizontal: 15,
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
  thinline: {
    height: 1,
    backgroundColor: 'lightgrey',
    marginLeft: 15,
    marginRight: 60,
  },
  fromToContainer: {
    width: 75,
    height: '100%',
    justifyContent: 'center',
    paddingLeft: 25,
  },
  textInputContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: 20,
  },
  inputStyle: {
    fontSize: 20,
    color: colors.blue,
  },
  calenderImageContainer: {
    marginLeft: 25,
    height: 30,
    width: 30,
  },
  calenderImage: {height: '100%', width: '100%', resizeMode: 'contain'},
  dateText: {fontSize: 20, color: colors.blue},
  calendar: {flexDirection: 'row', justifyContent: 'space-around', flex: 1},
});
