import React from 'react';
import {StyleSheet, View} from 'react-native';
import LottieView from 'lottie-react-native';
import Modal from 'react-native-modal';
import {loading} from '../../assets/loadings/index';
import colors from '../../constants/colors';
export function LoadingBar({visible}) {
  return (
    <Modal
    isVisible={visible}
      style={styles.modalStyle}
      useNativeDriver={true}
      animationIn="fadeIn"
      animationOut="fadeOut"
      >
      <View style={styles.cardStyle}>
        <LottieView
          source={loading}
          autoPlay
          loop
          style={{height: 150, width: 95}}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalStyle: {
    margin: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    // animationIn='fadeIn',
    // animationOut='fadeOut'
  },
  cardStyle: {
    backgroundColor: 'white',
    shadowOpacity: 0.25,
    shadowRadius: 5,
    //elevation: 5,
   // elevation: 10,
    height: 100,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.blue,
    overflow: 'hidden',
  },
});
