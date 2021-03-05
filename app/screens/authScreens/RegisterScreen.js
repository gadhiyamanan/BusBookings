import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import colors from '../../constants/colors';
import {TextInputComponent} from '../../components/TextInputComponent';
import {CustomButton} from '../../components/Buttoncomponent';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Courgette_Regular, Lobster_Regular} from '../../constants/fonts';
import {StackActions} from '@react-navigation/native';
import {signuplogo} from '../../assets/Images';
export default function RegisterScreen({navigation}) {
  console.log(navigation);
  function __onSignUpPress(navigation) {
    navigation.dispatch(StackActions.replace('daskBoardStack'));
  }
  return (
    <>
      <SafeAreaView />

      <KeyboardAwareScrollView
        style={{padding: 15}}
        showsVerticalScrollIndicator={false}>
        <View style={{height: 10}} />
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={signuplogo}
            style={{height: 100, width: 100, resizeMode: 'contain'}}
          />
        </View>
        <View style={styles.spacebtnTextInput} />
        <TextInputComponent
          textInputContainerStyle={{borderColor: colors.blue}}
          placeholder="First Name"
        />
        <View style={styles.spacebtnTextInput} />
        <TextInputComponent
          textInputContainerStyle={{borderColor: colors.blue}}
          placeholder="LastName"
        />
        <View style={styles.spacebtnTextInput} />
        <TextInputComponent
          textInputContainerStyle={{borderColor: colors.blue}}
          placeholder="Mobile Number"
          keyboardType="phone-pad"
        />
        <View style={styles.spacebtnTextInput} />
        <TextInputComponent
          textInputContainerStyle={{borderColor: colors.blue}}
          placeholder="Email"
          keyboardType="email-address"
        />
        <View style={styles.spacebtnTextInput} />
        <TextInputComponent
          textInputContainerStyle={{borderColor: colors.blue}}
          placeholder="Password"
          passwordfield={true}
        />
        <View style={styles.spacebtnTextInput} />
        <TextInputComponent
          textInputContainerStyle={{borderColor: colors.blue}}
          placeholder="Confirm Password"
          passwordfield={true}
        />
        <View style={styles.spacebtnTextInput} />
        <View style={{height: 15}} />
        <CustomButton
          title="SIGN UP"
          onPress={() => {
            __onSignUpPress(navigation);
          }}
        />
        <View style={{height: 30}} />
      </KeyboardAwareScrollView>
    </>
  );
}
const styles = StyleSheet.create({
  spacebtnTextInput: {height: 15},
});
