import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import {Header} from '../../components/Header';
import colors from '../../constants/colors';

export default function TicketScreen({route}) {
  const {bookedBusDetail} = route.params;

  return (
    <>
      <Header isback />
      <View style={styles.container}>
        <View style={styles.cardContainer}>
            <View style={styles.space}/>
          <View style={styles.descriptionContainer}>
              <Text>
                  From
              </Text>
          </View>
        </View>
      </View>
      <SafeAreaView style={{backgroundColor: colors.blue}} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.blue},
  cardContainer: {
    flex: 1,
    backgroundColor: colors.white,
    marginHorizontal: 35,
    marginTop: 20,
    marginBottom: 150,
    borderRadius: 15,
  },
  descriptionContainer:{
      paddingHorizontal:20
  },
  space:{
      height:10
  }
});
