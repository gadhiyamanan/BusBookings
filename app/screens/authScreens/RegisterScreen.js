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
  ToastAndroid,
} from 'react-native';
import { useDispatch} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import colors from '../../constants/colors';
import {userIcon, passwordIcon, mailIcon} from '../../assets/icons/index';
import {TextInputComponent} from '../../components/TextInputComponent';
import {CustomButton} from '../../components/Buttoncomponent';
import fonts from '../../constants/fonts';
import {logo, signuplogo} from '../../assets/Images';
import {StackActions} from '@react-navigation/native';
import {Header} from '../../components/Header';
import {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {LoadingBar} from '../../components/Dialog/LoadingBar';
import Database from '../../functions/Database';
import {SET_USER} from '../../actions/type';

export default function LoginScreen({navigation}) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPasswod, setConfirmPassword] = useState('');
  const [isloading, setIsLoading] = useState(false);
  const __onSignUp = () => {
    setIsLoading(true);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!name) {
      ToastAndroid.show('Enter Name', ToastAndroid.SHORT);
    } else if (!reg.test(email)) {
      ToastAndroid.show('Enter Proper Email', ToastAndroid.SHORT);
    } else if (password.length < 6) {
      ToastAndroid.show(
        'Password Must Contain 6 characters',
        ToastAndroid.SHORT,
      );
    } else if (password !== confirmPasswod) {
      ToastAndroid.show('Passwords Not Match', ToastAndroid.SHORT);
    } else {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(async () => {
          let ref = `user/${auth().currentUser.uid}`;
          let value = {
            name: name,
            email: email,
            userId: auth().currentUser.uid,
            createdAt: new Date().toString(),
            type:"user"
          };
          Database.databaseWrite(ref, value);
          dispatch({
            type: SET_USER,
            payload: value,
          });
          navigation.dispatch(StackActions.replace('daskBoardStack'));
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          if (error.code === 'auth/email-already-in-use') {
            ToastAndroid.show(
              'That email address is already in use!',
              ToastAndroid.SHORT,
            );
          } else {
            
            ToastAndroid.show(error.message, ToastAndroid.SHORT);
          }
        });
    }
  };
  return (
    <View style={styles.container}>
      <LoadingBar visible={isloading} />
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
                onChangeText={(text) => setName(text)}
                value={name}
              />
              <View style={{height: 10}} />
              <TextInputComponent
                placeholder="Enter Email"
                source={mailIcon}
                keyboardType="email-address"
                onChangeText={(text) => setEmail(text)}
                value={email}
              />
              <View style={{height: 10}} />
              <TextInputComponent
                placeholder="Enter Password"
                passwordfield
                source={passwordIcon}
                onChangeText={(text) => setPassword(text)}
                value={password}
              />
              <View style={{height: 10}} />
              <TextInputComponent
                placeholder="Confirm Password"
                passwordfield
                source={passwordIcon}
                onChangeText={(text) => setConfirmPassword(text)}
                value={confirmPasswod}
              />
              <View style={{height: 30}} />
              <CustomButton
                title={'Sign Up'}
                buttonContainerStyle={{backgroundColor: 'white'}}
                buttontitleStyle={{color: colors.blue}}
                onPress={
                  __onSignUp
             
                }
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
