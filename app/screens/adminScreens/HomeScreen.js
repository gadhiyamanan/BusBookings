import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useFocusEffect} from '@react-navigation/native';

export default function HomeScreen() {
  useFocusEffect(React.useCallback(() => {}, []));

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home Screen</Text>
      <Button title="logout" onPress={()=>auth()
  .signOut()}/>
    </View>
  );
}
