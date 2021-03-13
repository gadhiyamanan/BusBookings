import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import Modal from 'react-native-modal';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

import colors from '../../constants/colors';

export function CalenderPicker({isModalVisible, ...other}) {
  return (
    <Modal
      visible={isModalVisible}
      style={styles.modalStyle}
      animationIn="fadeIn"
      animationOut="fadeOut"
      onBackButtonPress={() =>{}}
      onBackdropPress={() => toggleModal()}>
      <Calendar
        {...other}

        minDate={Date()}
        monthFormat={'MMM yyyy'}
        firstDay={1}
        onPressArrowLeft={(subtractMonth) => subtractMonth()}
        onPressArrowRight={(addMonth) => addMonth()}
        enableSwipeMonths={true}
        style={{
          borderWidth: 1,
          borderColor: colors.blue,
          borderRadius: 8,
          marginHorizontal: 20,
          padding: 20,
        }}
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
});
