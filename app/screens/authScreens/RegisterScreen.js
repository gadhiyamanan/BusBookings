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
import {logo, signuplogo} from '../../assets/Images';
import {StackActions} from '@react-navigation/native';
import {Header} from '../../components/Header';
export default function LoginScreen({navigation}) {
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
        showsVerticalScrollIndicator={false}>
        <Header
        title="Sign Up"
          isback
          headerContainerStyle={{backgroundColor: 'white'}}
          iconStyle={{tintColor: colors.blue}}
        
        />
        <View style={styles.loginContainer}>
          <Image source={signuplogo} style={styles.image} />
          <View style={{width: '100%', padding: 25}}>
            <View style={styles.cardContainer}>
              <TextInputComponent
                placeholder="Enter Full Name"
                source={userIcon}
              />
              <View style={{height: 10}} />
              <TextInputComponent placeholder="Enter Email" source={mailIcon} keyboardType="email-address" />
              <View style={{height: 10}} />
              <TextInputComponent
              
                placeholder="Enter Password"
                passwordfield
                source={passwordIcon}
              />
              <View style={{height: 10}} />
              <TextInputComponent
                placeholder="Confirm Password"
                passwordfield
                source={passwordIcon}
              />
              <View style={{height: 30}} />
              <CustomButton
                title={'Sign Up'}
                buttonContainerStyle={{backgroundColor: 'white'}}
                buttontitleStyle={{color: colors.blue}}
                onPress={() => {
                  navigation.dispatch(StackActions.replace('daskBoardStack'));
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
