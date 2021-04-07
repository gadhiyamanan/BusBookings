import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
  Image,
  Touchable,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {busIcon, plusIcon} from '../../assets/icons';
import {LoadingBar} from '../../components/Dialog/LoadingBar';
import {Header} from '../../components/Header';
import colors from '../../constants/colors';
import Database from '../../functions/Database';
import {useFocusEffect} from '@react-navigation/native';
export default function EditBusList({navigation}) {
  const [busNo, setBusNo] = useState([]);
  const [isLoading, setIsLoading] = useState();
  useFocusEffect(
    React.useCallback(() => {
      _getData();
    }, []),
  );
  const _getData = async () => {
    setIsLoading(true);
    let res = await Database.dataBaseRead('bus/');
    let busNo = [];
    res.forEach(function (childSnapshot) {
      busNo.push(childSnapshot.val().busNo);
    });
    setBusNo(busNo);
    setIsLoading(false);
  };
  const renderItem = ({item, index}) => {
    return (
      <>
        <View style={styles.itemContainer}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={busIcon} style={styles.image} />
          </View>
          <Text>{item}</Text>
          <View style={{flex: 1}} />
          <TouchableOpacity
            style={{marginRight: 10}}
            onPress={() => __onEdit(item)}>
            <Text style={styles.touchableText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginHorizontal: 15}}
            onPress={() => __onDelete(item)}>
            <Text style={styles.touchableText}>Delete</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.line} />
      </>
    );
  };
  const __addNewBusPress = () => {
    navigation.navigate('addEditBus', {title: 'Add New Bus', mode: 'add'});
  };
  const __onEdit = (item) => {
    navigation.navigate('addEditBus', {
      title: 'Edit Bus Details',
      mode: 'edit',
      editBusNo: item,
    });
  };
  const __onDelete = async (item) => {
    Alert.alert('Are you sure want to delete?', '', [
      {
        text: 'Cancel',

        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: async () => {
          setIsLoading(true);
          let res = await Database.databaseDelete(`bus/${item}`);
          _getData();
        },
      },
    ]);

    setIsLoading(false);
  };
  return (
    <>
      <LoadingBar visible={isLoading} />
      <Header title="Edit Bus" isback />
      <View style={styles.root}>
        <FlatList
          data={busNo}
          renderItem={renderItem}
          keyExtractor={(__, index) => String(index)}
          ListEmptyComponent={
            <View style={{alignItems: 'center'}}>
              <Text>No Records Found</Text>
            </View>
          }
        />
        <TouchableOpacity
          style={styles.floatButtonContainer}
          onPress={__addNewBusPress}>
          <Image style={styles.plusimage} source={plusIcon} />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    height: '100%',
    width: 50,
    padding: 15,
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    tintColor: colors.blue,
  },
  line: {
    marginHorizontal: 15,
    height: 1,
    backgroundColor: colors.grey,
  },
  touchableText: {
    color: colors.blue,
    textDecorationLine: 'underline',
  },
  root: {backgroundColor: colors.white, flex: 1, paddingTop: 15},
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
  plusimage: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    tintColor: colors.white,
  },
});
