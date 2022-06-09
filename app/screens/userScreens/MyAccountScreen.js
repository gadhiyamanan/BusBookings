import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  ImageBackground
} from 'react-native';
import {myAccountIcon} from '../../assets/icons';
import {CustomButton} from '../../components/Buttoncomponent';
import {Header} from '../../components/Header';
import colors from '../../constants/colors';
import {StackActions} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { useSelector } from 'react-redux';
export default function MyAccountScreen({navigation}) {
  let user=useSelector(({user})=>user.userData)

  const __onLogoutPress = () => {
    auth()
      .signOut()
      .then(() => navigation.dispatch(StackActions.replace('authStack')));
  };
  const __onEditProfilePress = () => {
    navigation.navigate('editProfile');
  };
  return (
    <>
      <Header title="My Account" />
      <View style={styles.root}>
        <View style={styles.container}>
          <View style={styles.imageContainerStyle}>
            <ImageBackground  source={myAccountIcon} style={[styles.imageSubContainerStyle]}>
              <Image source={user.profilePic?{uri:user.profilePic}:myAccountIcon} style={styles.image} />
            </ImageBackground >
          </View>
          <View style={{height: 10}} />
          <View style={{alignItems: 'center'}}>
            <Text>Hello</Text>
            <Text style={styles.nameText}>{user.name}</Text>
          </View>
        </View>
        <View style={{height: 1, backgroundColor: colors.lightgrey}} />

        <View style={styles.descriptionContainer}>
          <View style={styles.subDescriptionContainer}>
            <Text style={styles.text}>Email</Text>
            <Text style={styles.subText}>{user.email}</Text>
          </View>
          <View style={styles.thinline} />
          <View style={styles.subDescriptionContainer}>
            <Text style={styles.text}>Contact No.</Text>
            <Text style={styles.subText}>{user.contactNo?user.contactNo:"-"}</Text>
          </View>
          <View style={styles.thinline} />
          <View style={styles.subDescriptionContainer}>
            <Text style={styles.text}>Gender</Text>
            <Text style={styles.subText}>{user.gender?user.gender:"-"}</Text>
          </View>
          <View style={styles.thinline} />
          <View style={styles.subDescriptionContainer}>
            <Text style={styles.text}>Age</Text>
            <Text style={styles.subText}>{user.age?user.age:"-"}</Text>
          </View>
          <View style={styles.thinline} />
          <View style={{height: 10}} />
          <CustomButton title="Edit Profile" onPress={__onEditProfilePress} />
          <View style={{height: 10}} />
          <CustomButton title="Logout" onPress={__onLogoutPress} />
          <View style={{height: 10}} />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    justifyContent: 'space-evenly',
    backgroundColor: colors.white,
    flex: 1,
  },
  container: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },

  descriptionContainer: {paddingHorizontal: 30},
  subDescriptionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  text: {fontSize: 15},
  subText: {color: colors.grey},
  thinline: {
    height: 1,
    backgroundColor: colors.lightgrey,
  },

  imageContainerStyle: {
    height: 90,
    width: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.blue,
  },

  imageSubContainerStyle: {
    height: 80,
    width: 80,
    borderRadius: 40,
    borderColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  nameText: {fontSize: 18, color: colors.blue, fontWeight: 'bold'},
});
