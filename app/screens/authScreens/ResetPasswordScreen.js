import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import colors from '../../constants/colors';

import {TextInputComponent} from '../../components/TextInputComponent';
import {CustomButton} from '../../components/Buttoncomponent';
import fonts from '../../constants/fonts';

import {StackActions} from '@react-navigation/native';
import {Header} from '../../components/Header';
export default function ResetPasswordScreen({navigation}) {
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>

        <Header
          isback
          // headerContainerStyle={{backgroundColor: 'white'}}
          // iconStyle={{tintColor: colors.blue}}
          title={"Forget Password"}
        />      
        <View style={styles.loginContainer}>
          <View style={{width: '100%', padding: 30}}>
            <View style={styles.cardContainer}>
              <TextInputComponent
                textInputContainerStyle={{paddingHorizontal: 10}}
                placeholder="Enter Email"
              />
              <View style={{height: 30}} />
              <CustomButton
                title={'Change Password'}
                buttonContainerStyle={{backgroundColor: 'white'}}
                buttontitleStyle={{color: colors.blue}}
                onPress={() => {
                  navigation.dispatch(StackActions.replace('authStack'));
                }}
              />
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>

      <SafeAreaView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  loginContainer: {
    
    justifyContent: 'center',

    alignItems: 'center',
  },
  registerContainer: {justifyContent: 'center', alignItems: 'center'},
  cardContainer: {
    backgroundColor: colors.blue,
    width: '100%',
    padding: 20,
    borderRadius: 20,
  },
  register: {
    width: '100%',

    borderTopWidth: 1,
    borderColor: 'lightgrey',
    justifyContent: 'center',
    alignItems: 'center',

    flexDirection: 'row',
    paddingVertical: 15,
  },
  weclcomeFont: {
    fontFamily: fonts.PacificoRegular,
    color: colors.blue,
    fontSize: 40,
    paddingBottom: 10,
  },
  image: {height: 120, width: 120, resizeMode: 'contain'},
});
