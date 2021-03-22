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
import {useNavigation} from '@react-navigation/native';
import {HeaderBackButton} from '@react-navigation/stack';
import {moderateScale} from 'react-native-size-matters';
import colors from '../constants/colors';

export function Header({
  title,
  headerContainerStyle,
  titleTextStyle,
  isback,
  iconStyle,
  ...other
}) {
  const navigation = useNavigation();

  return (
    <>
      <SafeAreaView style={{backgroundColor: colors.blue}} />
      <StatusBar backgroundColor={colors.blue} barStyle="light-content" />
      <View style={[styles.headerContainer, headerContainerStyle]}>
        <Text style={[styles.titleText, titleTextStyle]}>
          {title ? title : ''}
        </Text>
        {isback ? (
          <TouchableOpacity style={styles.iconContainer} {...other}>
            <HeaderBackButton
              backImage={() => (
                <Image source={goBackIcon} style={[styles.image, iconStyle]} />
              )}
              onPress={() => navigation.goBack()}
              labelVisible={false}
            />
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
  titleText: {fontSize: moderateScale(18), color: 'white'},
  iconContainer: {position: 'absolute', alignItems: 'center', left: 10},
  image: {height: 22, width: 22, resizeMode: 'contain'},
});
