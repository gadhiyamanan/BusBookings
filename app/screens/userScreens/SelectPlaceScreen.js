import React from 'react';
import {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TextInput,
  FlatList,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import {leftarrowIcon} from '../../assets/icons';
import {logo} from '../../assets/Images';
import colors from '../../constants/colors';
const DATA = [
  'Ahmedabad',
  'Amreli district',
  'Anand',
  'Banaskantha',
  'Bharuch',
  'Bhavnagar',
  'Dahod',
  'The Dangs',
  'Gandhinagar',
  'Jamnagar',
  'Junagadh',
  'Kutch',
  'Kheda',
  'Mehsana',
  'Narmada',
  'Navsari',
  'Patan',
  'Panchmahal',
  'Porbandar',
  'Rajkot',
  'Sabarkantha',
  'Surendranagar',
  'Surat',
  'Vyara',
  'Vadodara',
  'Valsad',
];
export default function SelectPlaceScreen({navigation,route}) {
  const [placeName, setpalceName] = useState();
  const [data, setdata] = useState(DATA);
  
  const { title,setCity } = route.params;
  
  const renderItem = ({item}) => {
    return (
      <>
        <TouchableOpacity
          style={styles.cityNameContainer}
          onPress={() => {
            __onCityPress(item);
          }}>
          <Text>{item}</Text>
        </TouchableOpacity>
        <View style={styles.thinline} />
      </>
    );
  };


  function _changeText(text) {
    let textLowerCase = text.toLowerCase();
    let trucks = DATA;
    let filteredName = trucks.filter((item) => {
      return item.toLowerCase().match(textLowerCase);
    });
    setdata(filteredName);
    setpalceName(text);
  }

  function __onCityPress(item) {
    setpalceName(item);
    setCity(item);
    navigation.navigate("home")
  }
  return (
    <>
      <SafeAreaView backgroundColor={colors.blue} />
      <View style={styles.inputContainar}>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => {
         
            navigation.navigate("home")
          }}>
          <Image source={leftarrowIcon} style={styles.image} />
        </TouchableOpacity>
        <View style={styles.textInputContainer}>
          <TextInput
            placeholder={title}
            style={styles.textInput}
            value={placeName}
            onChangeText={(text) => {
              _changeText(text);
            }}
          />
        </View>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(__, index) => String(index)}
        showsVerticalScrollIndicator={false}
      />
    </>
  );
}

const styles = StyleSheet.create({
  inputContainar: {
    height: 50,
    flexDirection: 'row',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  iconContainer: {
    height: '100%',
    width: 40,
    marginLeft: 10,
    marginRight: 10,
    padding: 7,
  },
  image: {height: '100%', width: '100%', resizeMode: 'contain'},
  textInputContainer: {flex: 1, padding: 5, justifyContent: 'center'},
  textInput: {fontSize: 17},
  cityNameContainer: {marginLeft: 15, padding: 10, paddingTop: 15},
  thinline: {
    height: 1,
    backgroundColor: 'lightgrey',
    marginLeft: 20,
    marginRight: 20,
  },
});
