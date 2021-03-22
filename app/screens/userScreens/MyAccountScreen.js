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
import {myAccountIcon} from '../../assets/icons';
import {CustomButton} from '../../components/Buttoncomponent';
import {Header} from '../../components/Header';
import colors from '../../constants/colors';
import {StackActions} from '@react-navigation/native';
export default function MyAccountScreen({navigation}) {
  const __onLogoutPress = () => {
    navigation.dispatch(StackActions.replace('authStack'));
  };
  const __onEditProfilePress = () => {
    navigation.navigate('editProfile');
  };
  return (
    <>
      <Header title="My Account" />
      <View style={styles.container}>
        <View style={styles.imageContainerStyle}>
          <View style={[styles.imageSubContainerStyle]}>
            <Image source={myAccountIcon} style={styles.image} />
          </View>
        </View>

        <View style={{alignItems: 'center'}}>
          <Text>Hello</Text>
          <Text style={styles.nameText}>Manan Gadhiya</Text>
        </View>
      </View>
      <View style={{height: 1, backgroundColor: colors.lightgrey}} />

      <View style={styles.descriptionContainer}>
        <View style={styles.subDescriptionContainer}>
          <Text style={styles.text}>Email</Text>
          <Text style={styles.subText}>gadhiyamanan18@gmail.com</Text>
        </View>
        <View style={styles.thinline} />
        <View style={styles.subDescriptionContainer}>
          <Text style={styles.text}>Contact No.</Text>
          <Text style={styles.subText}>7284562312</Text>
        </View>
        <View style={styles.thinline} />
        <View style={styles.subDescriptionContainer}>
          <Text style={styles.text}>Gender</Text>
          <Text style={styles.subText}>Male</Text>
        </View>
        <View style={styles.thinline} />
        <View style={styles.subDescriptionContainer}>
          <Text style={styles.text}>Age</Text>
          <Text style={styles.subText}>23</Text>
        </View>
        <View style={styles.thinline} />
        <View style={{height: 10}} />
        <CustomButton
          title="Edit Profile"
          buttonContainerStyle={{height: 40}}
          onPress={__onEditProfilePress}
        />
        <View style={{height: 10}} />
        <CustomButton
          title="Logout"
          buttonContainerStyle={{height: 40}}
          onPress={__onLogoutPress}
        />
        <View style={{height: 10}} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  descriptionContainer: {backgroundColor: colors.white, paddingHorizontal: 30},
  subDescriptionContainer: {
    backgroundColor: colors.white,
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
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    tintColor: colors.blue,
  },
  nameText: {fontSize: 18, color: colors.blue, fontWeight: 'bold'},
});
