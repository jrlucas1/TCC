import React, {useEffect, useState} from 'react';
import {View, Alert} from 'react-native';
import MyButtom from '../../components/MyButtom';
import {Text} from './styles';
import auth from '@react-native-firebase/auth';
import app from '@react-native-firebase/app';
import { CommonActions } from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage'

const Home = ({navigation}) => {
  const [cont, setCont] = useState(0);

  async function removeUserSession() {
    try {
        await EncryptedStorage.removeItem("user_session");
    } catch (error) {
    }
}
  useEffect(() => {
    console.log('chamou na criação do componente');

    return () => {
      console.log('chamou ao destruir o componente');
    };
  }, []);

  //na atualização do componente
  useEffect(() => {
    console.log('chamou na atualização do componente');
  }, [cont]);

  const signOut = () => {
    auth().signOut();
    removeUserSession();
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'AuthStack'}],
      }),
    );
  };
  return (
    <View>
      <MyButtom text="SignOut" onClick={signOut} />
    </View>
  );
};
export default Home;
