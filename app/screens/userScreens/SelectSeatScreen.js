import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  FlatList,
} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {Header} from '../../components/Header';
import {SeatComponent} from '../../components/seatComponent';
import colors from '../../constants/colors';
import {CustomButton} from '../../components/Buttoncomponent';

export default class SelectSeatScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      bookedSeats: [2, 3, 7, 8, 20, 25, 40],
      selectedSeats: [],

      seatmap: [
        1,
        1,
        0,
        1,
        1,
        1,
        1,
        1,
        0,
        1,
        1,
        1,
        1,
        1,
        0,
        1,
        1,
        1,
        1,
        1,
        0,
        1,
        1,
        1,
        1,
        1,
        0,
        1,
        1,
        1,
        1,
        1,
        0,
        1,
        1,
        1,
        1,
        1,
        0,
        1,
        1,
        1,
        1,
        1,
        0,
        1,
        1,
        1,
        1,
        1,
        0,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
      ],
    };
    createNewSeat = [];
    price = 2000;
  }
  componentDidMount() {
    let seats = 0;
    this.state.seatmap.map((item, index) => {
      if (item !== 0) {
        seats += 1;
      }
      createNewSeat.push({seatno: item === 0 ? 0 : seats, pattern: item});
    });
    this.setState({
      seatmap: createNewSeat,
    });
  }
  __onNextPress = () => {
    this.props.navigation.navigate('reservation', {
      seatInfo: {
        amount: this.state.selectedSeats.length * price,
        seats: this.state.selectedSeats,
      },
    });
  };
  __onSeatSelect = (seatIndex) => {
    let privousSelected = this.state.selectedSeats;

    if (
      this.state.selectedSeats.filter((item) => item === seatIndex).length === 0
    ) {
      privousSelected.push(seatIndex);
    } else {
      privousSelected = this.state.selectedSeats.filter(
        (item) => item !== seatIndex,
      );
    }
    this.setState({
      selectedSeats: privousSelected,
    });
  };
  renderItem = ({item, index}) => {
    let booked = this.state.bookedSeats.filter(
      (seatItem) => seatItem === item.seatno,
    );
    let selected = this.state.selectedSeats.filter(
      (seatItem) => seatItem === item.seatno,
    );

    return item.pattern !== 0 ? (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <SeatComponent
          seatStatus={booked.length !== 0 ? 1 : selected.length !== 0 ? 2 : 0}
          seatNumber={item.seatno}
          onPress={() => this.__onSeatSelect(item.seatno)}
        />
      </View>
    ) : (
      <View style={{flex: 1}} />
    );
  };
  render() {
    return (
      <>
        <Header title="Select Seat" isback />
        <View style={{height: 10}} />
        <View style={styles.seatDescriptionConatiner}>
          <View style={styles.alignCenter}>
            <SeatComponent disabled seatStatus={0} />
            <Text style={styles.imageText}>Available Seats</Text>
          </View>
          <View style={styles.alignCenter}>
            <SeatComponent disabled seatStatus={2} />
            <Text style={styles.imageText}>Selected Seats</Text>
          </View>
          <View style={styles.alignCenter}>
            <SeatComponent disabled seatStatus={1} />
            <Text style={styles.imageText}>Booked Seats</Text>
          </View>
        </View>
        <View style={{height: 10}} />
        <View style={styles.cardContainer}>
          <FlatList
            data={this.state.seatmap}
            renderItem={this.renderItem}
            keyExtractor={(__, index) => String(index)}
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: 'space-between',
              padding: 15,
            }}
            showsVerticalScrollIndicator={false}
            numColumns={6}
            ItemSeparatorComponent={() => <View style={{height: 10}} />}
          />
        </View>
        <View style={[styles.seatDescriptionConatiner]}>
          <View style={styles.alignCenter}>
            <Text style={styles.titleText}>Ticket Rate</Text>
            <Text style={styles.text}>₹ {price}</Text>
          </View>
          <View style={styles.alignCenter}>
            <Text style={styles.titleText}>No Of Seats</Text>
            <Text style={styles.text}>{this.state.selectedSeats.length}</Text>
          </View>
          <View style={styles.alignCenter}>
            <Text style={styles.titleText}>Total Amount</Text>
            <Text style={styles.text}>
              ₹ {this.state.selectedSeats.length * price}
            </Text>
          </View>
        </View>
        <CustomButton
          title="Next"
          buttonContainerStyle={{
            margin: 10,
            height: verticalScale(50),
            backgroundColor: !this.state.selectedSeats.length
              ? colors.lightgrey
              : colors.lightblue,
          }}
          onPress={this.__onNextPress}
          disabled={!this.state.selectedSeats.length}
        />

        <SafeAreaView />
      </>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    height: 27,
    width: 27,
    resizeMode: 'contain',
  },
  titleText: {fontSize: 13},
  text: {fontSize: 12, opacity: 0.5},
  alignCenter: {alignItems: 'center'},
  imageText: {
    fontSize: 10,
    paddingTop: 5,
  },
  seatDescriptionConatiner: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  cardContainer: {
    flex: 1,
    //flexDirection: 'row',
    borderRadius: 13,
    marginHorizontal: 25,
    marginVertical: 10,
    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    backgroundColor: '#ffffff',
    elevation: 4,
  },

  card: {
    height: '100%',
    width: '40%',
  },
});
