import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Touchable,
  TouchableOpacity,
  Image,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import colors from '../../constants/colors';
import {userIcon, passwordIcon, mailIcon} from '../../assets/icons/index';
import {TextInputComponent} from '../../components/TextInputComponent';
import {CustomButton} from '../../components/Buttoncomponent';
import fonts from '../../constants/fonts';
import {logo} from '../../assets/Images';
import {StackActions} from '@react-navigation/native';
export default function LoginScreen({navigation}) {
  return (
    <View style={styles.container}>
      <SafeAreaView />

      <KeyboardAwareScrollView
        contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.loginContainer}>
          <Image source={logo} style={styles.image} />
          <Text style={styles.weclcomeFont}>Welcome back!</Text>

          <View style={{width: '100%', padding: 25}}>
            <View style={styles.cardContainer}>
              <TextInputComponent source={mailIcon} placeholder="Enter Email" />
              <View style={{height: 30}} />
              <TextInputComponent
                source={passwordIcon}
                placeholder="Enter Password"
                passwordfield
              />
              <View style={{height: 10}} />
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('resetPassword');
                }}
                style={{paddingLeft: 20}}>
                <Text style={{color: 'white', fontSize: 13}}>
                  Forget Password?
                </Text>
              </TouchableOpacity>
              <View style={{height: 30}} />
              <CustomButton
                title={'Login'}
                buttonContainerStyle={{backgroundColor: 'white'}}
                buttontitleStyle={{color: colors.blue}}
                onPress={() => {
                  navigation.dispatch(StackActions.replace('daskBoardStack'));
                }}
              />
            </View>
          </View>
        </View>
        <View style={styles.registerContainer}></View>
        <View style={styles.register}>
          <View style={{height: 15}} />
          <Text>Don't have account? </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('register');
            }}>
            <Text style={{color: colors.blue}}>Register Here</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>

      <SafeAreaView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loginContainer: {
    flex: 1,
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
