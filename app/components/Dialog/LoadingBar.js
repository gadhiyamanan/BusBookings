import React from 'react';
import {StyleSheet, View} from 'react-native';
import LottieView from 'lottie-react-native';
import Modal from 'react-native-modal';
import { loading } from "../../assets/loadings/index";
export function LoadingBar({visible}) {
  return (
    <Modal visible={visible} style={styles.modalStyle}>
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
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
  },
  cardStyle: {
    backgroundColor: 'white',
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
    elevation: 10,
    height: 130,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
});
