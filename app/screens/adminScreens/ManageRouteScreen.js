import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
  Touchable,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {plusIcon} from '../../assets/icons';
import {LoadingBar} from '../../components/Dialog/LoadingBar';
import {Header} from '../../components/Header';
import colors from '../../constants/colors';
import Database from '../../functions/Database';
import {useFocusEffect} from '@react-navigation/native';

export default function ManageRouteScreen({navigation}) {
  const [routes, setRoutes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteKey, setDeleteKey] = useState([]);
  useFocusEffect(
    React.useCallback(() => {
      _getData();
    }, []),
  );

  const _getData = async () => {
    setIsLoading(true);
    let res = await Database.dataBaseRead('route');
    let routes = [];
    let deleteKey = [];
    res.forEach((element) => {
      var array = element.val().place.split(',');
      routes.push(array);
      deleteKey.push(element.val().routeId);
    });
    setRoutes(routes);
    setDeleteKey(deleteKey);
    setIsLoading(false);
  };
  const __onDelete = (index) => {
    Alert.alert('Are you sure want to delete?', '', [
      {
        text: 'Cancel',

        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: async () => {
          setIsLoading(true);
          await Database.databaseDelete(`route/${deleteKey[index]}`);

          _getData();
        },
      },
    ]);
  };

  const renderRouteName = ({item, index}) => {
    return (
      <Text>
        {index !== 0 && <Text> - </Text>}
        {item}
      </Text>
    );
  };

  const renderItem = ({item, index}) => {
    return (
      <>
        <View style={styles.flatlistContainer}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Text style={styles.index}>{index + 1} .</Text>

            <FlatList
              data={item}
              keyExtractor={(__, index) => String(index)}
              renderItem={renderRouteName}
              style={{flex: 1, flexWrap: 'wrap', flexDirection: 'row'}}
            />
          </View>
          <View style={styles.deleteContainer}>
            <TouchableOpacity onPress={() => __onDelete(index)}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.line} />
      </>
    );
  };
  return (
    <>
      <Header title="Manage Route" />
      <LoadingBar visible={isLoading} />
      <View style={styles.root}>
        <FlatList
          data={routes}
          keyExtractor={(__, index) => String(index)}
          renderItem={renderItem}
          ListEmptyComponent={
            <View style={{alignItems: 'center'}}>
              <Text>No Records Found</Text>
            </View>
          }
        />
        <TouchableOpacity
          style={styles.floatButtonContainer}
          onPress={() => navigation.navigate('addRoute')}>
          <Image style={styles.image} source={plusIcon} />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  root: {backgroundColor: colors.white, flex: 1, paddingTop: 15},
  flatlistContainer: {flexDirection: 'row'},
  deleteContainer: {
    paddingHorizontal: 10,
  },
  index: {paddingHorizontal: 15, fontWeight: 'bold'},
  deleteText: {color: colors.blue, textDecorationLine: 'underline'},
  line: {margin: 10, height: 1, backgroundColor: colors.grey},
  floatButtonContainer: {
    position: 'absolute',
    height: 50,
    width: 50,
    backgroundColor: colors.blue,
    borderRadius: 50,
    bottom: 20,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 13,
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    tintColor: colors.white,
  },
});
