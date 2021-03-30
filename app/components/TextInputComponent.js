import React from 'react';
import {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  Image,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import {hidePassword, showPassword} from '../assets/icons';

import colors from '../constants/colors';

export function TextInputComponent({
  source,
  textInputContainerStyle,
  imageContainerStyle,
  textInputStyle,
  imageStyle,
  passwordfield,
  passwordIconContainerStyle,
  passwordIconStyle,
  ...other
}) {
  const [isHidePassword, setIsHidePassword] = useState(passwordfield);
  const BLUE="#428AF8"
  return (
    <>
     
      <View
        style={[
          styles.textInputContainer,
          {paddingLeft: source ? 0 : 15},
          textInputContainerStyle,
        ]}>
        {source ? (
          <>
            <View style={[styles.imageContainer, imageContainerStyle]}>
              <Image source={source} style={[styles.image, imageStyle]} />
            </View>
            <View style={styles.line} />
          </>
        ) : null}

        <TextInput
          style={[styles.textInput, textInputStyle]}
          selectionColor={"rgba(86, 76, 205, 1)"}
          secureTextEntry={isHidePassword}
          {...other}
        />
        {passwordfield ? (
          <View
            style={[styles.passwordIconContainer, passwordIconContainerStyle]}>
            <TouchableOpacity
              onPress={() => {
                setIsHidePassword(!isHidePassword);
              }}>
              <Image
                source={isHidePassword ? showPassword : hidePassword}
                style={[styles.passwordIcon, passwordIconStyle]}
              />
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  textInputContainer: {
    height: 45,
    borderWidth: 1,
    borderColor: 'lightgrey',
    alignItems: 'center',
    borderRadius: 25,
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingRight: 15,
    justifyContent:"center"
    ,alignItems:"center"
  },
  imageContainer: {
    height: 45,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor:"red"
  },
  image: {
    height: 18,
    width: 18,
    resizeMode: 'contain',
    tintColor: colors.blue,
  },
  passwordIcon: {height: 18, width: 18, resizeMode: 'contain',tintColor:colors.blue},
  passwordIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
  },
  textInput: {fontSize: 15, flex: 1},
  line: {width: 1, height: "100%", backgroundColor: 'lightgrey'},
});
