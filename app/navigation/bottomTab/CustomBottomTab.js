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
  Image,
} from 'react-native';
import {color} from 'react-native-reanimated';
import colors from '../../constants/colors';
export default function CustomBottomTab({state, descriptors, navigation}) {
  return (
    <>
      <View style={{flexDirection: 'row',paddingVertical:10}}>
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
              style={styles.container}>
                <Image source={options.icon} style={[styles.image,{tintColor:isFocused?"blue":colors.lightblue}]}/>
              <Text
                style={{
                  color: isFocused ? "blue" : colors.lightblue,
                  fontWeight: isFocused ? 'bold' : null,
                }}>
                {title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <SafeAreaView />
    </>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  image:{height:30,width:30,resizeMode:"contain"}
});
