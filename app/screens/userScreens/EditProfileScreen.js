import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import {editPictureIcon, myAccountIcon, userIcon} from '../../assets/icons';
import {CustomButton} from '../../components/Buttoncomponent';
import {Header} from '../../components/Header';
import colors from '../../constants/colors';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {TextInputComponent} from '../../components/TextInputComponent';
import {useState} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
export default function EditProfileScreen({navigation}) {
  const [isMale, setIsMale] = useState(true);
  const [image, setImage] = useState(myAccountIcon);
  const __onSavePress = () => {
    navigation.navigate('MyAccount');
  };
  const __changeProfilePic = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
    })
      .then((image) => {
        setImage({uri: image.path});
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <Header title="Edit Profile" isback />
      <View style={styles.container}>
        <KeyboardAwareScrollView
          contentContainerStyle={{
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}
          showsVerticalScrollIndicator={false}>
          <View style={{height: 200, justifyContent: 'space-evenly'}}>
            <TouchableOpacity
              style={styles.imageContainerStyle}
              onPress={__changeProfilePic}>
              <View style={[styles.imageSubContainerStyle]}>
                <Image source={image} style={styles.image} />
              </View>
              <View style={styles.editImageContainer}>
                <Image source={editPictureIcon} style={styles.editImage} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.descriptionContainer}>
            <TextInputComponent
              textInputContainerStyle={{borderColor: colors.blue}}
              placeholder="Enter Name"
            />
            <View style={styles.space} />
            <TextInputComponent
              textInputContainerStyle={{borderColor: colors.blue}}
              placeholder="Enter Contact No."
              keyboardType="phone-pad"
            />
            <View style={styles.space} />
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
              }}>
              <CustomButton
                title="Male"
                buttonContainerStyle={{
                  flex: 1,
                  borderRadius: 50,
                  borderWidth: 1,
                  borderColor: colors.blue,
                  backgroundColor: isMale ? colors.blue : colors.white,
                }}
                buttontitleStyle={{color: isMale ? colors.white : colors.blue}}
                onPress={() => setIsMale(true)}
              />
              <View style={{width: 10}} />
              <CustomButton
                title="Female"
                buttonContainerStyle={{
                  flex: 1,
                  borderRadius: 50,
                  backgroundColor: isMale ? colors.white : colors.blue,
                  borderWidth: 1,
                  borderColor: colors.blue,
                }}
                buttontitleStyle={{color: isMale ? colors.blue : colors.white}}
                onPress={() => setIsMale(false)}
              />
            </View>
            <View style={styles.space} />
            <TextInputComponent
              textInputContainerStyle={{borderColor: colors.blue}}
              placeholder="Enter Age"
              keyboardType="number-pad"
            />
            <View style={styles.space} />
            <CustomButton title="Save" onPress={__onSavePress} />
            <View style={{height: 20}} />
          </View>
        </KeyboardAwareScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  space: {
    height: 10,
  },
  descriptionContainer: {
    backgroundColor: colors.white,
    width: '100%',
    paddingHorizontal: 30,
  },
  subDescriptionContainer: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  text: {fontSize: 15},
  subText: {color: colors.grey},
  thinline: {
    height: 1,
    backgroundColor: colors.lightgrey,
  },
  imageContainerStyle: {
    height: 90,
    width: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.blue,
  },
  imageSubContainerStyle: {
    height: 80,
    width: 80,
    borderRadius: 40,
    borderColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
    //tintColor: colors.blue,
  },
  editImage: {
    height: '100%',
    width: '100%',
    tintColor: colors.white,
    resizeMode: 'contain',
  },
  nameText: {fontSize: 18, color: colors.blue, fontWeight: 'bold'},
  editImageContainer: {
    position: 'absolute',
    height: 25,
    width: 25,
    backgroundColor: colors.blue,
    bottom: 0,
    right: 5,
    borderRadius: 50,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.blue,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.blue,
  },
});
