import { React, useContext, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage'
import { CommonActions } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { PermissionsAndroid } from 'react-native';
import { MessagingContext } from '../../context/MessagingProvider'
import { TabActions } from '@react-navigation/native';
import { AuthContext } from '../../context/AuthProvider';


const Preload = ({ navigation }) => {

  const { nav } = useContext(MessagingContext);
  const {onMessage} = useContext(MessagingContext);




  useEffect(()=>{
    onMessage(navigation);
  }, [onMessage])

  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS)

  async function retrieveUserSession() {
    try {
      const session = await EncryptedStorage.getItem('user_session');
      return session !== null ? JSON.parse(session) : null;
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
        switch (nav) {
          case 'peao':
            navigation.navigate('AppStack',
              { screen: 'Atividades' }
            );
            break;
          
          case 'proprietario':
            navigation.navigate('AppStack', 
            {screen: 'Propriedades'});
            break

          default:
            console.log("Default")
            navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [
                  { name: 'AppStack' }
                ]
              }
              )
            )
            break;
        }
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
          routes: [{ name: 'SignIn' }],
        }),
      );
    }
  };

  useEffect(() => {
    entrar()
  }
  )
  return (
    <View>
      <Text></Text>
    </View>
  );
};

export default Preload;
