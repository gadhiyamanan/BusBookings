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
  TouchableOpacity,
  Touchable,
} from 'react-native';
import {ratingIcon,filledRatingIcon} from '../assets/icons/index';
export function RatingBar({starsCount = 5, initial, isdisabled, getStar,ratingImageStyle}) {
  let stars = [];
  for (let i = 0; i < starsCount; i++) {
    stars.push((i + 1).toString());
  }

  const [activeStars, setActiveStars] = useState(initial);

  return (
    <View style={{flexDirection: 'row'}}>
      {stars.map((item) => {
        return (
          <TouchableOpacity
            key={String(item)}
            onPress={() => {
              setActiveStars(item);
              getStar(item);
            }}
            disabled={isdisabled}>
            <Image
              source={activeStars >= item ?filledRatingIcon:ratingIcon}
              style={[styles.ratingImage,ratingImageStyle]}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
const styles = StyleSheet.create({
  ratingImage: {height: 30, width: 30,marginRight:5},
 
});
