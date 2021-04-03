import React from 'react';
import {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import {CustomButton} from '../../components/Buttoncomponent';
import {Header} from '../../components/Header';
import {TextInputComponent} from '../../components/TextInputComponent';
import colors from '../../constants/colors';

export default function AddRouteScreen() {
  const [index, setindex] = useState(0);
  const [count, setCount] = useState([]);
  const [place, setPlace] = useState([]);
  const [distance, setDistance] = useState([1]);
  const __onAdd = () => {
    let check = 0;

    for (let index = 0; index <= count.length; index++) {
      if (place[index] && distance[index]) {
        check = check + 1;
      }
    }

    if (check - 1 === count.length) {
      let plus = count;
      plus.push(index);
      setCount(plus);
      setindex((index) => index + 1);
      
    } else {
      ToastAndroid.show('Enter All Details', ToastAndroid.SHORT);
    }
  };
  const __onSave = () => {
    let check = 0;

    for (let index = 0; index <= count.length; index++) {
      if (place[index] && distance[index]) {
        check = check + 1;
      }
    }
    if (check - 1 === count.length) {
      let temp = [...distance];
      temp[0] = 0;
      setDistance(temp);
    
    } else {
      ToastAndroid.show('Enter All Details', ToastAndroid.SHORT);
    }
  };
  return (
    <>
      <Header title="Add Route" isback />
      <KeyboardAvoidingScrollView style={styles.root}>
        <View style={styles.space} />
        <TouchableOpacity onPress={__onAdd}>
          <Text style={styles.addText}>Add Place</Text>
        </TouchableOpacity>
        <View style={styles.space} />
        <TextInputComponent
          placeholder="Enter Starting Point"
          value={place[0]}
          onChangeText={(text) => {
            let temp = [...place];
            temp[0] = text;
            setPlace(temp);
          }}
        />
        <View style={styles.space} />
        {count.map((item) => {
         
          return (
            <View key={item + 1}>
              <View style={{flexDirection: 'row'}}>
                <TextInputComponent
                  placeholder="Enter Place"
                  textInputContainerStyle={[
                    styles.textInput,
                    {marginRight: 10},
                  ]}
                  value={place[item + 1]}
                  onChangeText={(text) => {
                    let temp = [...place];
                    temp[item + 1] = text;
                    setPlace(temp);
                  }}
                />
                <TextInputComponent
                  placeholder="Enter Distance"
                  textInputContainerStyle={styles.textInput}
                  keyboardType="number-pad"
                  value={distance[item + 1]}
                  onChangeText={(text) => {
                    let temp = [...distance];
                    temp[item + 1] = text;
                    setDistance(temp);
                  }}
                />
              </View>
              <View style={styles.space} />
            </View>
          );
        })}
        {count.length >= 1 ? (
          <CustomButton title="Save" onPress={__onSave} />
        ) : (
          <></>
        )}
        <View style={styles.space} />
      </KeyboardAvoidingScrollView>
    </>
  );
}
const styles = StyleSheet.create({
  root: {flexGrow: 1, backgroundColor: colors.white, paddingHorizontal: 10},
  space: {height: 10},
  addText: {color: colors.blue, textDecorationLine: 'underline'},
  textInput: {flex: 1},
});
