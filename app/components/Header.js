import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Platform,
  Touchable,
  TouchableOpacity,
  Image,
} from 'react-native';
import {goBackIcon} from '../assets/icons/index';

import colors from '../constants/colors';

export function Header({
  title,
  headerContainerStyle,
  titleTextStyle,
  isback,
  ...other
}) {
  return (
    <>
      <SafeAreaView style={{backgroundColor: colors.blue}} />
      <StatusBar backgroundColor={colors.blue} barStyle="light-content" />
      <View style={[styles.headerContainer, headerContainerStyle]}>
        <Text style={[styles.titleText, titleTextStyle]}>
          {title ? title : 'set title'}
        </Text>
        {isback ? (
          <TouchableOpacity style={styles.iconContainer} {...other}>
            <Image source={goBackIcon} style={styles.image} />
          </TouchableOpacity>
        ) : null}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: colors.blue,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
   
  },
  titleText: {fontSize: 27, color: 'white'},
  iconContainer: {position: 'absolute', alignItems: 'center', left: 10},
  image: {height: 27, width: 27, resizeMode: 'contain'},
});
