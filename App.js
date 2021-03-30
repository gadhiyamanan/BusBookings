
 import React, { Component } from 'react';
 import { Button, StyleSheet, View, AppState } from 'react-native';

import RazorpayCheckout from 'react-native-razorpay';
 

 export default class ButtonBasics extends Component {
  state = {
    appState: AppState.currentState
  };
  componentDidMount() {
    AppState.addEventListener("change", this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener("change", this._handleAppStateChange);
  }
  _handleAppStateChange = state => {
    console.log(state);
    if (state === 'active') {
      // do this
     // console.log("active");
    } else if (state === 'background') {
      // do that
     // console.log("back");
     RazorpayCheckout.onExternalWalletSelection().then((data)=>{
      console.log(data);
    })
    } else if (state === 'inactive') {
      // do that other thing
     // console.log("quit");
    
    }
  
  };
  _onPressButton() {
var options = {
    description: 'Payment for Bus Booking',
    image: '',
    currency: 'INR',
    key: 'rzp_test_RqULCm05ouMaLI',
    amount: '5000',
    name: 'Bus Bookings.com',
    prefill: {
      email: 'void@razorpay.com',
      contact: '9191919191',
      name: 'Razorpay Software'
    },
    timeout:10,
    theme: {color: '#1592E6'}
  }
    RazorpayCheckout.open(options).then((data) => {
    // handle success
    console.log(data);
    alert(`Success: ${data}`);
  }).catch((error) => {
    // handle failure
    alert(`Error: ${error.code} | ${error.description}`);
  });

  }

  render() {
    return (

      <View style={styles.container}>
      <View style={styles.buttonContainer}>
      <Button
      onPress={this._onPressButton}
      title="Press Me"
      />
      </View>
      </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   justifyContent: 'center',
 },
 buttonContainer: {
  margin: 20
},
alternativeLayoutButtonContainer: {
  margin: 20,
  flexDirection: 'row',
  justifyContent: 'space-between'
}
});