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
import {LoadingBar} from '../../components/Dialog/LoadingBar';
import colors from '../../constants/colors';
import Database from '../../functions/Database';
export default function SelectBusScreen({navigation, route}) {
  const {title, setRouteData, setRouteIdData} = route.params;
  const [routes, setRoutes] = useState([]);
  const [routeId, setRouteId] = useState([]);
  const [data, setData] = useState();
  const [searchRoute, setSearchRoute] = useState();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    _getData();
  }, []);
  const _getData = async () => {
    setIsLoading(true);
    let res = await Database.dataBaseRead('route');
    let routes = [];
    let routeId = [];
    res.forEach((element) => {
      var array = element.val().place.split(',');
      routes.push(array);
      routeId.push(element.val().routeId);
    });
    setRoutes(routes);
    setData(routes);
    setRouteId(routeId);
    setIsLoading(false);
  };

  const __onRoutePress = (index) => {
    setRouteData(
      `${routes[index][0]}-${routes[index][routes[index].length - 1]}`,
    );
    setRouteIdData(routeId[index]);
    navigation.navigate('home');
  };

  function _changeText(text) {
    let textLowerCase = text.toLowerCase();
    let trucks = data;
    let filteredName = trucks.filter((item) => {
      return item.toLowerCase().match(textLowerCase);
    });
    setRoutes(filteredName);
    setSearchRoute(text);
  }
  const renderRouteName = ({item, index}) => {
    return (
      <Text>
        {index !== 0 && '-'}
        {item}
      </Text>
    );
  };
  const renderItem = ({item, index}) => {
    return (
      <>
        <View style={styles.flatlistContainer}>
          <TouchableOpacity
            style={{flex: 1, flexDirection: 'row'}}
            onPress={() => {
              __onRoutePress(index);
            }}>
            <View style={styles.cityNameContainer}>
              <FlatList
                data={item}
                keyExtractor={(__, index) => String(index)}
                renderItem={renderRouteName}
                style={{flex: 1, flexWrap: 'wrap', flexDirection: 'row'}}
              />
            </View>
          </TouchableOpacity>
        </View>
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
            value={searchRoute}
            onChangeText={(text) => {
              _changeText(text);
            }}
          />
        </View>
      </View>
      <FlatList
        data={routes}
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
