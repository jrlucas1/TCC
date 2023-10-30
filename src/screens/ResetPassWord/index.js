import React, {useState, useContext} from 'react';
import {View, Alert} from 'react-native';
import MyButton from '../../components/MyButton';
import {Text, TextInput, Div} from './styles';
import app from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

const ResetPassWord = ({navigation}) => {
  const [email, setEmail] = useState('');

  const reset = async () => {
    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        Alert.alert('Verifique sua caixa de e-mail.');
      })
      .catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  };
  const login = () => {
    navigation.navigate('SignIn');
  };
  return (
    <View>
      <Div>
      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        returnKeyType="next"
        onChangeText={t => setEmail(t)}
      />

      <MyButton text="Resetar senha" onClick={reset} />
      </Div>
      <Text onPress={login}> Voltar ao login </Text>
    </View>
  );
};

export default ResetPassWord;
