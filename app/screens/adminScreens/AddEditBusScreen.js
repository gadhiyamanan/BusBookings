import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Button,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {busIcon} from '../../assets/icons';
import {CustomButton} from '../../components/Buttoncomponent';
import {Header} from '../../components/Header';
import {TextInputComponent} from '../../components/TextInputComponent';
import colors from '../../constants/colors';

export default function AddEditBusScreen({naviagtion, route}) {
  const {mode, title} = route.params;
  return (
    <>
      <Header title={title} isback />

      <KeyboardAwareScrollView
        contentContainerStyle={styles.root}
        showsVerticalScrollIndicator={false}>
        <View style={styles.space} />
        <TextInputComponent placeholder="Enter Bus Number" source={busIcon} />

        <View style={styles.space} />
        <View style={styles.facilityContainer}>
          <View style={styles.facilityTextContainer}>
            <Text style={styles.facilityText}>Ac : </Text>
          </View>
          <CustomButton title="Yes" buttonContainerStyle={styles.radioButton} />
          <CustomButton title="No" buttonContainerStyle={styles.radioButton} />
        </View>
        <View style={styles.space} />
        <View style={styles.facilityContainer}>
          <View style={styles.facilityTextContainer}>
            <Text style={styles.facilityText}>WiFi : </Text>
          </View>
          <CustomButton
            title="Yes"
            buttonContainerStyle={[
              styles.radioButton,
              {backgroundColor: colors.blue},
            ]}
          />
          <CustomButton title="No" buttonContainerStyle={styles.radioButton} />
        </View>
        <View style={styles.space} />
        <View style={styles.facilityContainer}>
          <View style={styles.facilityTextContainer}>
            <Text style={styles.facilityText}>Tv : </Text>
          </View>
          <CustomButton
            title="Yes"
            buttonContainerStyle={[
              styles.radioButton,
              {backgroundColor: colors.blue},
            ]}
          />
          <CustomButton title="No" buttonContainerStyle={styles.radioButton} />
        </View>
        <View style={styles.space} />
        <View style={styles.facilityContainer}>
          <View style={styles.facilityTextContainer}>
            <Text style={styles.facilityText}>Type : </Text>
          </View>
          <CustomButton
            title="Sleeper"
            buttonContainerStyle={[
              styles.radioButton,
              {backgroundColor: colors.blue},
            ]}
          />
          <CustomButton
            title="Seater"
            buttonContainerStyle={styles.radioButton}
          />
        </View>
        <View style={styles.space} />
        <View style={styles.facilityContainer}>
          <View style={[styles.facilityTextContainer]}>
            <Text style={styles.facilityText}>Seats : </Text>
          </View>

          <TextInputComponent
            textInputContainerStyle={styles.radioButton}
            placeholder="Enter Seats"
            keyboardType="decimal-pad"
          />
        </View>
        <View style={styles.space}/>

        <View style={styles.space}/>
        <CustomButton title="Save"/>
        <View style={styles.space}/>
        <View style={styles.space}/>
      </KeyboardAwareScrollView>
    </>
  );
}
const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  space: {height: 20},
  facilityContainer: {flexDirection: 'row', justifyContent:"space-around"},
  facilityText: {fontSize: 15},
  radioButton: {flex:1,marginHorizontal:20, height: 40, borderRadius: 50},
  facilityTextContainer: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
