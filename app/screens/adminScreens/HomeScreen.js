import React, {useRef} from 'react';
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
  ToastAndroid,
} from 'react-native';
import {calenderIcon, menuIcon} from '../../assets/icons';
import moment from 'moment';
import {Header} from '../../components/Header';
import colors from '../../constants/colors';
import {CustomButton} from '../../components/Buttoncomponent';
import {CalenderPicker} from '../../components/Dialog/calenderPickerComponent';
import {useFocusEffect} from '@react-navigation/native';
import Database from '../../functions/Database';
import database from '@react-native-firebase/database';
import {LoadingBar} from '../../components/Dialog/LoadingBar';
import Menu, {MenuItem} from 'react-native-material-menu';
import auth from '@react-native-firebase/auth';
import {StackActions} from '@react-navigation/native';
import {TextInputComponent} from '../../components/TextInputComponent';
export default function HomeScreen({navigation}) {
  useFocusEffect(React.useCallback(() => {}, []));
  const [date, setDate] = useState(new Date());
  const [route, setRoute] = useState();
  const [routeId, setRouteId] = useState();
  const [busNo, setBusNo] = useState();
  const [isCalendeShow, setIsCalenderShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [price, setPrice] = useState("");
  const menuref = useRef();
  const __onConfirm = async () => {
    let key = database().ref().push().key;
    if (!busNo) {
      ToastAndroid.show('PLease Select Bus No', ToastAndroid.SHORT);
    } else if (!route) {
      ToastAndroid.show('PLease Select Route', ToastAndroid.SHORT);
    }else if (price==="") {
      ToastAndroid.show('PLease Enter Price', ToastAndroid.SHORT);
    }
     else {
      setIsLoading(true);
      let res = await Database.dataBaseRead(
        `journey/${moment(date).format('DDMMYYYY')}`,
      );
      let busno = [];
      res.forEach((element) => {
        busno.push(element.val().busNo);
      });
      let busCheck = busno.filter((item) => item === busNo);
      if (busCheck.length === 0) {
        let resBus = await Database.dataBaseRead(`bus/${busNo}`);
        let seats = resBus.val().seatMap.split(',');
        let availableSeats = [];
        let counter = 0;
        for (let i = 0; i < seats.length; i++) {
          if (seats[i] == 1) {
            counter = counter + 1;
            availableSeats.push(counter);
          }
        }

        let ref = `journey/${moment(date).format('DDMMYYYY')}/${key}`;
        let value = {
          busNo: busNo,
          routeId: routeId,
          date: `${moment(date).format('DDMMYYYY')}`,
          availableSeats: availableSeats.toString(),
          price:price,
          journeyId:key
        };
        await Database.databaseWrite(ref, value);
        ToastAndroid.show('Bus Journey Confirm', ToastAndroid.SHORT);
      } else {
        ToastAndroid.show(
          'Bus Is Already Taken For That Date',
          ToastAndroid.SHORT,
        );
      }
      setIsLoading(false);
    }
  };
  const showMenu = () => {
    menuref.current.show();
  };
  const __logout = () => {
    menuref.current.hide();
    auth()
      .signOut()
      .then(() => navigation.dispatch(StackActions.replace('authStack')));
  };
  return (
    <>
      <View>
        <Header title="Home" />
        <TouchableOpacity style={styles.menuIconContainer} onPress={showMenu}>
          <Menu
            ref={menuref}
            button={<Image source={menuIcon} style={styles.menu} />}>
            <MenuItem onPress={__logout}>Logout</MenuItem>
          </Menu>
        </TouchableOpacity>
      </View>

      <LoadingBar visible={isLoading} />
      <CalenderPicker
        isModalVisible={isCalendeShow}
        onDayPress={(day) => {
          setDate(day.timestamp);
          setIsCalenderShow(false);
        }}
        __onBackPress={() => setIsCalenderShow(false)}
      />
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={{height: 40}} />
        <View style={styles.cardContainer}>
          <View style={{flex: 1 / 2}}>
            <PlaceSelectView
              title="Bus"
              value={busNo}
              inputTextTitle="Select Bus"
              onFocus={() => {
                navigation.navigate('selectBus', {
                  title: 'Search Bus',
                  setBus: (data) => {
                    setBusNo(data);
                  },
                });
              }}
            />
          </View>
          <View style={styles.thinline} />
          <View style={{flex: 1 / 2}}>
            <PlaceSelectView
              title="Route"
              value={route}
              inputTextTitle="Select Route"
              onFocus={() => {
                navigation.navigate('selectRoute', {
                  title: 'Search Route',
                  setRouteData: (data) => {
                    setRoute(data);
                  },
                  setRouteIdData: (data) => {
                    setRouteId(data);
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
                    sameElse: 'dddd',
                  })}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{height: 20}} />
        <TextInputComponent
          value={price}
          onChangeText={(text) => {
            setPrice(text)
          }}
          textInputContainerStyle={{marginHorizontal: 15}}
          placeholder="Enter Price"
          keyboardType="number-pad"
        />
        <View style={{height: 20}} />
        <CustomButton
          title="Confim Journey"
          buttonContainerStyle={{marginHorizontal: 15}}
          onPress={__onConfirm}
        />
        <View style={{height: 20}} />
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
  menuIconContainer: {
    position: 'absolute',
    right: 13,
    height: '100%',
    justifyContent: 'center',
  },
  menu: {height: 18, width: 18, tintColor: colors.white, resizeMode: 'contain'},
});
