import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import {CustomButton} from '../../components/Buttoncomponent';
import {Header} from '../../components/Header';
import colors from '../../constants/colors';

export default function ManageBusScreen({navigation}) {
  const __addNewBusPress = () => {
    navigation.navigate('addEditBus', {title: 'Add New Bus', mode: 'add'});
  };
  const __editBusPress = () => {
    navigation.navigate('editBusList');
  };
  return (
    <>
      <Header title="Manage Bus" />
      <View style={styles.root}>
        <View style={styles.buttonContainer}>
          <CustomButton title="Add New Bus" onPress={__addNewBusPress} />
          <View style={{height: 10}} />
          <CustomButton title="Edit Bus Details" onPress={__editBusPress} />
        </View>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  buttonContainer: {width: '100%', paddingHorizontal: 10},
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
});
