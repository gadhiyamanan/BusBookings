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
  const [isHidePassword, setIsHidePassword] = useState(true);
  return (
    <>
      <SafeAreaView />
      <View style={[styles.textInputContainer, textInputContainerStyle]}>
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
          selectionColor={colors.blue}
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
    height: 50,
    borderWidth: 1,
    borderColor: 'lightgrey',
    alignItems: 'center',
    borderRadius: 25,
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingRight: 20,
  },
  imageContainer: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
    tintColor: 'lightgrey',
  },
  passwordIcon: {height: 20, width: 20, resizeMode: 'contain'},
  passwordIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
  },
  textInput: {fontSize: 20, flex: 1,paddingLeft:10},
  line: {width: 1, height: 50, backgroundColor: 'lightgrey'},
});
