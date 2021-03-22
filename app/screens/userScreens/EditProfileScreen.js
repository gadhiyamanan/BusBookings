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
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {TextInputComponent} from '../../components/TextInputComponent';
export default function EditProfileScreen() {
  return (
    <>
      <Header title="Edit Profile" isback />
      <View style={styles.container}>
        <KeyboardAwareScrollView
          contentContainerStyle={{
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}
          showsVerticalScrollIndicator={false}>
          <View style={{height: 200, justifyContent: 'space-evenly'}}>
            <View style={styles.imageContainerStyle}>
              <View style={[styles.imageSubContainerStyle]}>
                <Image source={myAccountIcon} style={styles.image} />
              </View>
            </View>
          </View>
          <View style={styles.descriptionContainer}>
            <TextInputComponent
              textInputContainerStyle={{borderColor: colors.blue}}
              placeholder="Enter Name"
            />
            <View style={styles.space} />
            <TextInputComponent
              textInputContainerStyle={{borderColor: colors.blue}}
              placeholder="Enter Contact No."
              keyboardType="phone-pad"
            />
            <View style={styles.space} />
            <View>
              
            </View>
            <TextInputComponent
              textInputContainerStyle={{borderColor: colors.blue}}
              placeholder="Enter Age"
              keyboardType="number-pad"
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  space: {
    height: 10,
  },
  descriptionContainer: {
    backgroundColor: colors.white,
    width: '100%',
    paddingHorizontal: 30,
  },
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
    alignItems: 'center',
    justifyContent: 'center',
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
