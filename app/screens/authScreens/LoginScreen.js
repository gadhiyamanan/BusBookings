import React, {useEffect, useState} from 'react';
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
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import colors from '../../constants/colors';
import {userIcon, passwordIcon, mailIcon} from '../../assets/icons/index';
import {TextInputComponent} from '../../components/TextInputComponent';
import {CustomButton} from '../../components/Buttoncomponent';
import fonts from '../../constants/fonts';
import {logo} from '../../assets/Images';
import {StackActions} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import Database from '../../functions/Database';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {LoadingBar} from '../../components/Dialog/LoadingBar';
import {SET_USER} from '../../actions/type';
export default function LoginScreen({navigation}) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('test1@gmail.com');
  const [password, setPassword] = useState('123456');

  const __onLogin = () => {
    setIsLoading(true);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!reg.test(email)) {
      ToastAndroid.show('Enter Proper Email', ToastAndroid.SHORT);
    } else if (password.length < 6) {
      ToastAndroid.show(
        'Password Must Contain 6 characters',
        ToastAndroid.SHORT,
      );
    } else {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(async () => {
          let res = await Database.dataBaseRead(
            `user/${auth().currentUser.uid}`,
          );
          if (res.val().type === 'user') {
            dispatch({
              type: SET_USER,
              payload: res.val(),
            });
            navigation.dispatch(StackActions.replace('daskBoardStack'));
            setIsLoading(false);
          } else {
            navigation.dispatch(StackActions.replace('adminBoardStack'));
            setIsLoading(false);
          }
        })
        .catch((error) => {
          setIsLoading(false);
          if (error.code === 'auth/user-not-found') {
            ToastAndroid.show('Please Register First', ToastAndroid.SHORT);
          } else if (error.code === 'auth/wrong-password') {
            ToastAndroid.show('Password Is Incorrect', ToastAndroid.SHORT);
          } else {
            ToastAndroid.show(error.message, ToastAndroid.SHORT);
          }
        });
    }
  };
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <LoadingBar visible={isLoading} />
      <KeyboardAwareScrollView
        contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.loginContainer}>
          <Image source={logo} style={styles.image} />
          <Text style={styles.weclcomeFont}>Welcome back!</Text>

          <View style={{width: '100%', padding: 25}}>
            <View style={styles.cardContainer}>
              <TextInputComponent
                source={mailIcon}
                placeholder="Enter Email"
                keyboardType="email-address"
                onChangeText={(text) => setEmail(text)}
                value={email}
              />
              <View style={{height: 30}} />
              <TextInputComponent
                source={passwordIcon}
                placeholder="Enter Password"
                passwordfield
                onChangeText={(text) => setPassword(text)}
                value={password}
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
                onPress={__onLogin}
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
