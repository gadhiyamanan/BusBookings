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
} from 'react-native';
import colors from '../constants/colors';
export function CustomButton({
  buttonContainerStyle,
  buttontitleStyle,
  title,
  disabled,
  ...other
}) {
  return (
    <TouchableOpacity
    disabled={disabled}
      style={[styles.buttonContainer, buttonContainerStyle]}
      {...other}>
      <Text style={[styles.buttontitle, buttontitleStyle]}>
        {title ? title : 'set the title'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: colors.blue,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  buttontitle: {color: 'white', fontSize: 17},
});
