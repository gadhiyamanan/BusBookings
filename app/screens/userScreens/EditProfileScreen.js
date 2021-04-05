import React, {useEffect} from 'react';
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
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import SET_USER from '../../actions/type';
import Database from '../../functions/Database';
import storage from '@react-native-firebase/storage';
import {LoadingBar} from '../../components/Dialog/LoadingBar';
export default function EditProfileScreen({navigation}) {
  const dispatch = useDispatch();
  const [isMale, setIsMale] = useState('');
  const [image, setImage] = useState(myAccountIcon);
  const [name, setName] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [age, setAge] = useState('');
  const [imagePath, setImagePath] = useState();
  const [isLoading, setIsLoading] = useState(false);
  let user = useSelector(({user}) => user.userData);

  useEffect(() => {
    _setData();
  }, []);
  const _setData = () => {
    setName(user.name);
    setContactNo(user.contactNo);
    setAge(user.age);
    setIsMale(user.gender === 'female' ? false : true);
    setImage(user.profilePic ? {uri: user.profilePic} : myAccountIcon);
  };
  const __onSavePress = async () => {
    setIsLoading(true);
    let newData = {...user};
    newData.age = age;
    newData.name = name;
    newData.contactNo = contactNo;
    newData.gender = isMale ? 'male' : 'female';

    if (imagePath) {
      await storage()
        .ref(`profilePic/${auth().currentUser.uid}.png`)
        .putFile(imagePath);
      const url = await storage()
        .ref(`profilePic/${auth().currentUser.uid}.png`)
        .getDownloadURL();
      newData.profilePic = url;
    }
    dispatch({
      type: 'SET_USER',
      payload: newData,
    });

    Database.databaseWrite(`user/${auth().currentUser.uid}`, newData);
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
        setImagePath(image.path);
      })
      .catch((error) => {
        console.log(error);
      });
    setIsLoading(false);
  };
  return (
    <>
      <Header title="Edit Profile" isback />
      <LoadingBar visible={isLoading} />
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
              value={name}
              onChangeText={(text) => setName(text)}
            />
            <View style={styles.space} />
            <TextInputComponent
              textInputContainerStyle={{borderColor: colors.blue}}
              placeholder="Enter Contact No."
              keyboardType="phone-pad"
              value={contactNo}
              onChangeText={(text) => setContactNo(text)}
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
              value={age}
              onChangeText={(text) => setAge(text)}
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
