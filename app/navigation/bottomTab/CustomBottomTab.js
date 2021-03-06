import React, {useEffect} from 'react';
import {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Touchable,
  TouchableOpacity,
  Image,
  Dimensions,
  Keyboard,
} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

import colors from '../../constants/colors';
export default function CustomBottomTab({state, descriptors, navigation}) {
  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []);

  const _keyboardDidShow = () => {
    SetBottom(false);
  };

  const _keyboardDidHide = () => {
    SetBottom(true);
  };
  const [bottom, SetBottom] = useState(true);

  return bottom ? (
    <>
      <View style={styles.container}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const title = options.title;

          const isFocused = state.index === index;

          return (
            <TouchableOpacity
              key={String(index)}
              onPress={() => {
                navigation.navigate(route.name);
              }}
              style={styles.contentContainer}>
              <View
                style={{height: verticalScale(23), width: verticalScale(23)}}>
                <Image
                  source={options.icon}
                  style={[styles.image, {opacity: isFocused ? 1 : 0.5}]}
                />
              </View>
              <Text
                style={[
                  {
                    fontWeight: isFocused ? 'bold' : 'normal',
                    opacity: isFocused ? 1 : 0.5,
                  },
                  styles.title,
                ]}>
                {title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <SafeAreaView backgroundColor="white" />
    </>
  ) : null;
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: scale(35),
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    tintColor: colors.blue,
  },
  container: {
    flexDirection: 'row',
    paddingVertical: 10,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: colors.blue,
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
  },
  title: {color: colors.blue, fontSize: moderateScale(10)},
});
