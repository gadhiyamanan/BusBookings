import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import auth from '@react-native-firebase/auth';
import {StackActions} from '@react-navigation/native';
import Database from '../functions/Database';
import {useDispatch} from 'react-redux';
import {SET_USER} from '../actions/type';
export default function Splashscreen({navigation}) {
  const dispatch = useDispatch();
  useEffect(() => {
    _checkLoginDetails();
  }, []);
  const _checkLoginDetails = async () => {
    if (auth().currentUser) {
      let res = await Database.dataBaseRead(`user/${auth().currentUser.uid}`);

      if (res.val().type === 'user') {
        dispatch({
          type: SET_USER,
          payload: res.val(),
        });
        navigation.dispatch(StackActions.replace('daskBoardStack'));
      } else {
        navigation.dispatch(StackActions.replace('adminBoardStack'));
      }
    } else {
      navigation.dispatch(StackActions.replace('authStack'));
    }
    SplashScreen.hide();
  };
  return null;
}
