import React, {useEffect} from 'react';
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
import {LoadingBar} from '../../components/Dialog/LoadingBar';
import colors from '../../constants/colors';
import Database from '../../functions/Database';
export default function SelectBusScreen({navigation, route}) {
  const {title, setBus} = route.params;
  const [busno, SetBusNo] = useState([]);
  const [data, setData] = useState();
  const [searchbus, setSearchBus] = useState();
  const [isLoading, setIsloading] = useState(false);
  useEffect(() => {
    _getData();
  }, []);
  const _getData = async () => {
    setIsloading(true);
    let res = await Database.dataBaseRead(`bus`);
    let busNo = [];
    res.forEach((element) => {
      busNo.push(element.val().busNo);
    });
    SetBusNo(busNo);
    setData(busNo);
    setIsloading(false);
  };
  const __onBusPress = (item) => {
    SetBusNo(item);
    setBus(item);
    navigation.navigate('home');
  };

  function _changeText(text) {
    let textLowerCase = text.toLowerCase();
    let trucks = data;
    let filteredName = trucks.filter((item) => {
      return item.toLowerCase().match(textLowerCase);
    });
    SetBusNo(filteredName);
    setSearchBus(text);
  }
  const renderItem = ({item}) => {
    return (
      <>
        <TouchableOpacity
          style={styles.cityNameContainer}
          onPress={() => {
            __onBusPress(item);
          }}>
          <Text>{item}</Text>
        </TouchableOpacity>
        <View style={styles.thinline} />
      </>
    );
  };
  return (
    <>
      <SafeAreaView backgroundColor={colors.blue} />
      <LoadingBar visible={isLoading} />
      <View style={styles.inputContainar}>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => {
            navigation.navigate('home');
          }}>
          <Image source={leftarrowIcon} style={styles.image} />
        </TouchableOpacity>
        <View style={styles.textInputContainer}>
          <TextInput
            placeholder={title}
            style={styles.textInput}
            value={searchbus}
            onChangeText={(text) => {
              _changeText(text);
            }}
          />
        </View>
      </View>
      <FlatList
        data={busno}
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
