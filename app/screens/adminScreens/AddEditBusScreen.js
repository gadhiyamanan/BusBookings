import React from 'react';
import {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Button,
  ToastAndroid,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {busIcon} from '../../assets/icons';
import {CustomButton} from '../../components/Buttoncomponent';
import {Header} from '../../components/Header';
import {TextInputComponent} from '../../components/TextInputComponent';
import colors from '../../constants/colors';

export default function AddEditBusScreen({naviagtion, route}) {
  const {mode, title,editBusNo} = route.params;
  
  const [busNo, setBusNo] = useState('dddddddddd');
  const [isAc, setIsAC] = useState(true);
  const [isWifi, setIsWifi] = useState(true);
  const [isTv, setIsTv] = useState(true);
  const [isSleeper, setIsSleeper] = useState(true);
  const [seats, setSeats] = useState('50');

  const __onSave = () => {
    if (busNo.length !== 10) {
      ToastAndroid.show('Enter Proper Bus Number', ToastAndroid.SHORT);
    } else if (
      seats.length === 0 ||
      (isSleeper && seats % 6 !== 2) ||
      (!isSleeper && seats % 5 !== 1)
    ) {
      ToastAndroid.show('Enter Proper Seats', ToastAndroid.SHORT);
    } else {
      let seatMap = [];
      if (isSleeper) {
        let j = 2;
        let k = 3;
        let loop = parseInt(((seats - 2) / 6 - 1) * 2) + parseInt(seats);
        for (let i = 0; i < loop; i++) {
          if (i === j) {
            j = j + 8;
            if (j < loop) seatMap.push(0);
            else seatMap.push(1);
          } else if (i === k) {
            k = k + 8;
            if (k < loop) seatMap.push(0);
            else seatMap.push(1);
          } else {
            seatMap.push(1);
          }
        }
      } else {
        let j = 2;
        let loop = parseInt((seats - 1) / 5 - 1) + parseInt(seats);
        for (let i = 0; i < loop; i++) {
          if (i === j) {
            j = j + 6;
            if (j < loop) seatMap.push(0);
            else seatMap.push(1);
          } else {
            seatMap.push(1);
          }
        }
      }


    }
    
  };

  return (
    <>
      <Header title={title} isback />

      <KeyboardAwareScrollView
        contentContainerStyle={styles.root}
        showsVerticalScrollIndicator={false}>
        <View style={styles.space} />
        <TextInputComponent
          placeholder="Enter Bus Number"
          source={busIcon}
          value={busNo}
          onChangeText={(value) => setBusNo(value)}
        />
        <View style={styles.space} />
        <View style={styles.facilityContainer}>
          <View style={styles.facilityTextContainer}>
            <Text style={styles.facilityText}>Ac : </Text>
          </View>
          <CustomButton
            title="Yes"
            buttonContainerStyle={[
              styles.radioButton,
              {backgroundColor: isAc ? colors.blue : colors.white},
            ]}
            buttontitleStyle={{color: isAc ? colors.white : colors.blue}}
            onPress={() => setIsAC(true)}
          />
          <CustomButton
            title="No"
            buttonContainerStyle={[
              styles.radioButton,
              {backgroundColor: isAc ? colors.white : colors.blue},
            ]}
            buttontitleStyle={{color: isAc ? colors.blue : colors.white}}
            onPress={() => setIsAC(false)}
          />
        </View>
        <View style={styles.space} />
        <View style={styles.facilityContainer}>
          <View style={styles.facilityTextContainer}>
            <Text style={styles.facilityText}>WiFi : </Text>
          </View>
          <CustomButton
            title="Yes"
            buttonContainerStyle={[
              styles.radioButton,
              {backgroundColor: isWifi ? colors.blue : colors.white},
            ]}
            buttontitleStyle={{color: isWifi ? colors.white : colors.blue}}
            onPress={() => setIsWifi(true)}
          />
          <CustomButton
            title="No"
            buttonContainerStyle={[
              styles.radioButton,
              {backgroundColor: isWifi ? colors.white : colors.blue},
            ]}
            buttontitleStyle={{color: isWifi ? colors.blue : colors.white}}
            onPress={() => setIsWifi(false)}
          />
        </View>
        <View style={styles.space} />
        <View style={styles.facilityContainer}>
          <View style={styles.facilityTextContainer}>
            <Text style={styles.facilityText}>Tv : </Text>
          </View>
          <CustomButton
            title="Yes"
            buttonContainerStyle={[
              styles.radioButton,
              {backgroundColor: isTv ? colors.blue : colors.white},
            ]}
            buttontitleStyle={{color: isTv ? colors.white : colors.blue}}
            onPress={() => setIsTv(true)}
          />
          <CustomButton
            title="No"
            buttonContainerStyle={[
              styles.radioButton,
              {backgroundColor: isTv ? colors.white : colors.blue},
            ]}
            buttontitleStyle={{color: isTv ? colors.blue : colors.white}}
            onPress={() => setIsTv(false)}
          />
        </View>
        <View style={styles.space} />
        <View style={styles.facilityContainer}>
          <View style={styles.facilityTextContainer}>
            <Text style={styles.facilityText}>Type : </Text>
          </View>
          <CustomButton
            title="Sleeper"
            buttonContainerStyle={[
              styles.radioButton,
              {backgroundColor: isSleeper ? colors.blue : colors.white},
            ]}
            buttontitleStyle={{color: isSleeper ? colors.white : colors.blue}}
            onPress={() => setIsSleeper(true)}
          />
          <CustomButton
            title="Seater"
            buttonContainerStyle={styles.radioButton}
            buttontitleStyle={{color: isSleeper ? colors.blue : colors.white}}
            buttonContainerStyle={[
              styles.radioButton,
              {backgroundColor: isSleeper ? colors.white : colors.blue},
            ]}
            buttontitleStyle={{color: isSleeper ? colors.blue : colors.white}}
            onPress={() => setIsSleeper(false)}
          />
        </View>
        <View style={styles.space} />
        <View style={styles.facilityContainer}>
          <View style={[styles.facilityTextContainer]}>
            <Text style={styles.facilityText}>Seats : </Text>
          </View>
          <TextInputComponent
            textInputContainerStyle={styles.radioButton}
            placeholder="Enter Seats"
            keyboardType="decimal-pad"
            value={seats}
            onChangeText={(value) => setSeats(value)}
          />
        </View>
        <View style={styles.space} />
        <View style={styles.space} />
        <CustomButton title="ADD BUS" onPress={__onSave} />
        <View style={styles.space} />
        <View style={styles.space} />
      </KeyboardAwareScrollView>
    </>
  );
}
const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  space: {height: 20},
  facilityContainer: {flexDirection: 'row', justifyContent: 'space-around'},
  facilityText: {fontSize: 15},
  radioButton: {
    flex: 1,
    marginHorizontal: 20,
    height: 40,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: colors.blue,
  },
  facilityTextContainer: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
