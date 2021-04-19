import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
  Image,
} from 'react-native';
import {Header} from '../../components/Header';
import colors from '../../constants/colors';
import QRCode from 'react-native-qrcode-svg';
import {logo} from '../../assets/Images';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {ArrowIcon} from '../../assets/icons';
import {RatingBar} from '../../components/RatingBar';
import moment from 'moment';
import Database from '../../functions/Database';
import auth from '@react-native-firebase/auth';
import {LoadingBar} from '../../components/Dialog/LoadingBar';
export default function TicketScreen({route}) {
  const {bookedBusDetail} = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const renderItem = ({item}) => <Text style={styles.darkText}>{item} </Text>;
  const __onStar = async (rating) => {
    setIsLoading(true);
    let ref = `ratings/${bookedBusDetail.ticketId}`;
    let value = {
      ratings: rating,
      userId: auth().currentUser.uid,
      ticketId: bookedBusDetail.ticketId,
      busNo: bookedBusDetail.busNo,
    };
    await Database.databaseWrite(ref, value);
    setIsLoading(false);
  };

  return (
    <>
      <Header isback title="Ticket" />
      <LoadingBar visible={isLoading} />
      <View style={styles.container}>
        <View style={styles.cardContainer}>
          <View style={{height: verticalScale(10)}} />
          <View style={{alignItems: 'center'}}>
            <Text style={{fontSize: 13}}>{bookedBusDetail.busNo}</Text>
          </View>
          <View style={styles.fromToContainer}>
            <View style={styles.leftSide}>
              <Text style={styles.lightText}>From</Text>
              <Text style={styles.placeText}>{bookedBusDetail.from}</Text>
            </View>
            <View style={styles.imageContainer}>
              <Image source={ArrowIcon} style={styles.image} />
            </View>
            <View style={styles.rightSide}>
              <Text style={styles.lightText}>To</Text>
              <Text style={styles.placeText}>{bookedBusDetail.to}</Text>
            </View>
          </View>
          <View style={styles.space} />
          <View style={styles.thinline} />
          <View style={{height: verticalScale(20)}} />
          <View style={styles.descriptionContainer}>
            <View style={styles.leftSubDescriptionContainer}>
              <Text style={styles.lightText}>Journey Date</Text>
              <Text style={[styles.darkText, {fontSize: scale(11)}]}>
                {moment(bookedBusDetail.date).format('DD/MM/YYYY') ===
                'Invalid date'
                  ? moment(parseInt(bookedBusDetail.date)).format('DD/MM/YYYY')
                  : moment(bookedBusDetail.date).format('DD/MM/YYYY')}
              </Text>
              <View style={styles.space} />
              <Text style={styles.lightText}>Seats</Text>
              <Text style={styles.dark}>{bookedBusDetail.seats.length}</Text>
              <View style={styles.space} />
            </View>
            <View style={styles.rightSubDescriptionContainer}>
              <Text style={styles.lightText}>Ticket Id</Text>
              <Text style={[styles.darkText, {fontSize: scale(11)}]}>
                {bookedBusDetail.ticketId}
              </Text>
              <View style={styles.space} />
              <Text style={styles.lightText}>Seat No</Text>
              <FlatList
                renderItem={renderItem}
                keyExtractor={(__, index) => String(index)}
                data={bookedBusDetail.seats}
                numColumns={5}
              />
              <View style={styles.space} />
            </View>
          </View>
          <View style={styles.descriptionContainer}>
            <View style={styles.leftSubDescriptionContainer}>
              <Text style={styles.lightText}>Transaction Id</Text>
              <Text style={styles.darkText}>
                {bookedBusDetail.transactionId}
              </Text>
            </View>
            <View style={styles.rightSubDescriptionContainer}>
              <Text style={styles.lightText}>Price</Text>
              <Text style={styles.darkText}>₹ {bookedBusDetail.price}</Text>
            </View>
          </View>
          <View style={{height: verticalScale(35)}} />
          <View style={styles.roundContainer}>
            <View style={styles.leftRound} />
            <View style={{flex: 1, justifyContent: 'center'}}>
              <View style={styles.thinline} />
            </View>
            <View style={styles.rightRound} />
          </View>
          <View style={styles.barCodeContainer}>
            <QRCode
              value={JSON.stringify(bookedBusDetail)}
              size={verticalScale(100)}
              logo={logo}
              logoSize={30}
              logoBackgroundColor="white"
            />
          </View>
        </View>
        <View style={styles.starCarContainer}>
          <RatingBar
            initial={bookedBusDetail.stars}
            getStar={(rating) => __onStar(rating)}
            containerStyle={{justifyContent: 'space-evenly'}}
            isdisabled={
              moment(bookedBusDetail.date).format('DD/MM/YYYY') ===
              'Invalid date'
                ? moment(parseInt(bookedBusDetail.date)).format('YYYY/MM/DD')
                : moment(bookedBusDetail.date).format('YYYY/MM/DD') ||
                  bookedBusDetail.isCancle === true
            }
          />
        </View>
      </View>
      <SafeAreaView style={{backgroundColor: colors.blue}} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blue,
    justifyContent: 'space-evenly',
  },
  starCarContainer: {
    backgroundColor: colors.white,
    marginHorizontal: 60,
    height: verticalScale(60),
    borderRadius: 10,
    justifyContent: 'center',
  },
  cardContainer: {
    backgroundColor: colors.white,
    marginHorizontal: 60,
    height: verticalScale(450),
    borderRadius: 10,
  },
  descriptionContainer: {
    paddingHorizontal: 15,
    flexDirection: 'row',
  },
  space: {
    height: verticalScale(15),
  },
  fromToContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  lightText: {
    color: colors.lightgrey,
    fontSize: scale(10),
  },
  leftSide: {},
  rightSide: {
    alignItems: 'flex-end',
  },
  placeText: {
    fontSize: scale(15),
    fontWeight: 'bold',
    color: colors.lightblue,
  },
  thinline: {
    height: 1,
    backgroundColor: colors.lightgrey,
    marginHorizontal: 15,
  },
  leftSubDescriptionContainer: {},
  rightSubDescriptionContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  darkText: {fontSize: scale(12)},
  roundContainer: {
    height: 26,
    flexDirection: 'row',

    backgroundColor: 'transparent',
  },
  leftRound: {
    width: 13,
    height: 26,
    borderTopRightRadius: 13,
    borderBottomRightRadius: 13,
    backgroundColor: colors.blue,
  },
  rightRound: {
    width: 13,
    height: 26,
    borderBottomLeftRadius: 13,
    borderTopLeftRadius: 13,
    backgroundColor: colors.blue,
    alignSelf: 'flex-end',
  },
  barCodeContainer: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  image: {resizeMode: 'contain', width: '100%', resizeMode: 'contain'},
  imageContainer: {
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
});
