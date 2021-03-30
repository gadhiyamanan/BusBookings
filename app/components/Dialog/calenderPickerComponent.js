import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

import colors from '../../constants/colors';
import {cancelIcon} from '../../assets/icons';

export function CalenderPicker({isModalVisible, __onBackPress, ...other}) {
  return (
    <Modal
      visible={isModalVisible}
      style={styles.modalStyle}
      animationIn="fadeIn"
      animationOut="fadeOut"
      useNativeDriver
      onBackButtonPress={__onBackPress}
      onBackdropPress={__onBackPress}>
      <View style={{marginHorizontal:20,marginBottom:3}} >
        <TouchableOpacity style={styles.imageContainer} onPress={__onBackPress}>
        <Image
          source={cancelIcon}
          style={styles.image}
        />
        </TouchableOpacity>
      </View>
      <Calendar
        {...other}
        minDate={Date()}
        monthFormat={'MMM yyyy'}
        firstDay={1}
        onPressArrowLeft={(subtractMonth) => subtractMonth()}
        onPressArrowRight={(addMonth) => addMonth()}
        enableSwipeMonths={true}
        style={styles.calenderStyle}
        theme={{
          textSectionTitleColor: '#b6c1cd',
          selectedDayBackgroundColor: colors.lightblue,
          selectedDayTextColor: '#ffffff',
          todayTextColor: colors.blue,
          dotColor: colors.blue,
          arrowColor: colors.blue,
          monthTextColor: 'black',
          textDayFontWeight: '300',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '300',
          textDayFontSize: 16,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 16,
        }}
      />
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalStyle: {
    margin: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  calenderStyle:{
    borderWidth: 1,
    borderColor: colors.blue,
    borderRadius: 8,
    marginHorizontal: 20,
    padding: 20,
  },
  imageContainer:{
    height: 30, width: 30,padding:10,alignSelf:"flex-end",backgroundColor:colors.blue,borderRadius:50
  },
  image:{resizeMode: 'contain',height:"100%",width:"100%",tintColor:colors.white}
});
