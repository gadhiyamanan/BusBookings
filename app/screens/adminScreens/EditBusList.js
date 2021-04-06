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
} from 'react-native';
import {busIcon} from '../../assets/icons';
import {LoadingBar} from '../../components/Dialog/LoadingBar';
import {Header} from '../../components/Header';
import colors from '../../constants/colors';
import Database from '../../functions/Database';
// const busNo = ['GJ05RJ3665', 'GJ05GH1111', 'GHJGHJGHJK'];
export default function EditBusList({navigation}) {
  const [busNo, setBusNo] = useState([]);
  const [isLoading, setIsLoading] = useState();
  useEffect(() => {
   
    _getData();
  }, []);

  const _getData = async () => {
    setIsLoading(true)
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
          <TouchableOpacity style={{marginHorizontal: 15}} onPress={() =>__onDelete(item)}>
            <Text style={styles.touchableText}>Delete</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.line} />
      </>
    );
  };
  const __onEdit = (item) => {
    navigation.navigate('addEditBus', {
      title: 'Edit Bus Details',
      mode: 'edit',
      editBusNo: item,
    });
  };
  const __onDelete = async(item) => {
    setIsLoading(true)
   let res= await Database.databaseDelete(`bus/${item}`)
   _getData()
   setIsLoading(false)
  };
  return (
    <>
    <LoadingBar visible={isLoading} />
      <Header title="Edit Bus" isback />
      <FlatList
        data={busNo}
        renderItem={renderItem}
        keyExtractor={(__, index) => String(index)}
      />
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
});
