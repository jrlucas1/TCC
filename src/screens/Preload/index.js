<<<<<<< HEAD
import {React, useEffect} from 'react';
import {View, Text, Alert} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage'
import { CommonActions } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import app from '@react-native-firebase/app';
=======
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {View, Text, Alert} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {CommonActions} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
>>>>>>> 069b065aebb480c38b0d03f7e934e55b231fc405

// import { Container } from './styles';

const Preload = ({navigation}) => {
<<<<<<< HEAD

  
async function retrieveUserSession(){
  try {   
      const session = await EncryptedStorage.getItem('user_session');
      return session !== null ? JSON.parse(session): null;
  } catch (error) {
      console.error("Preload, retrieveUserSession: " + error);
      return null;
  }
}
const entrar = async () => {
  const userSession = await retrieveUserSession();
  console.log(userSession);
  if (userSession) {
    try {
      await auth().signInWithEmailAndPassword(
        userSession.email,
        userSession.pass,
      );
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'AppStack'}],
        }),
      );
    } catch (e) {
      console.error('SignIn, entrar: ' + e);
      switch (e.code) {
        case 'auth/user-not-found':
          Alert.alert('Erro', 'Usuário não cadastrado.');
          break;
        case 'auth/wrong-password':
          Alert.alert('Erro', 'Erro na senha.');
          break;
        case 'auth/invalid-email':
          Alert.alert('Erro', 'Email inválido.');
          break;
        case 'auth/user-disabled':
          Alert.alert('Erro', 'Usuário desabilitado.');
          break;
      }
    }
  } else {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'SignIn'}],
      }),
    );
  }
};

useEffect(()=>{
  entrar()
}
)
=======
  async function retrieveUserSession() {
    try {
      const session = await EncryptedStorage.getItem('user_session');
      return session !== null ? JSON.parse(session) : null;
    } catch (error) {
      console.error('Preload, retrieveUserSession: ' + error);
    }
  }

  const entrar = async () => {
    const userSession = await retrieveUserSession();
    console.log(userSession);
    if (userSession) {
      try {
        await auth().signInWithEmailAndPassword(
          userSession.email,
          userSession.pass,
        );
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'AppStack'}],
          }),
        );
      } catch (e) {
        console.error('SignIn, entrar: ' + e);
        switch (e.code) {
          case 'auth/user-not-found':
            Alert.alert('Erro', 'Usuário não cadastrado.');
            break;
          case 'auth/wrong-password':
            Alert.alert('Erro', 'Erro na senha.');
            break;
          case 'auth/invalid-email':
            Alert.alert('Erro', 'Email inválido.');
            break;
          case 'auth/user-disabled':
            Alert.alert('Erro', 'Usuário desabilitado.');
            break;
        }
      }
    } else {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'SignIn'}],
        }),
      );
    }
  };

  useEffect(() => {
    entrar();
  }, []);

>>>>>>> 069b065aebb480c38b0d03f7e934e55b231fc405
  return (
    <View>
      <Text></Text>
    </View>
  );
};

export default Preload;
