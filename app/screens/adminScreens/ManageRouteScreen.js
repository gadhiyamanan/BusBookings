import React from 'react';
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
import { Header } from '../../components/Header';
import colors from '../../constants/colors';
const data = [
  [
    'Ahmedabad',
    'Amreli',
    'Anand',
    'Banaskantha',
    'Bharuch',
    'Bhavnagar',
    'Dahod',
    'Dang',
    'Navsari',
    'Patan',
  ],
  [
    'Ahmedabad',
    'Amreli',
    'Anand',
    'Banaskantha',
    'Gandhinagar',
    'Jamnagar',
    'Junagadh',
    'Kutch',
    'Kheda',
    'Mehsana',
    'Narmada',
    'Navsari',
    'Patan',
  ],
  [
    'Ahmedabad',
    'Amreli',
    'Anand',
    'Banaskantha',
    'Dangs',
    'Gandhinagar',
    'Jamnagar',
    'Junagadh',
    'Kutch',
    'Kheda',
    'Mehsana',
    'Narmada',
    'Navsari',
    'Patan',
  ],
];
export default function ManageRouteScreen({navigation}) {
  const renderRouteName = ({item, index}) => <Text>{item} -</Text>;

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
            <TouchableOpacity>
              <Text style={styles.deleteText} onPress={null}>
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.line} />
      </>
    );
  };
  return (
    <>
    <Header title="Manage Route"/>
    <View style={styles.root}>
      <FlatList
        data={data}
        keyExtractor={(__, index) => String(index)}
        renderItem={renderItem}
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
