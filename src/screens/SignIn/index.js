import React, { useState, useContext } from 'react';
import { View, Alert } from 'react-native';
import MyButtom from '../../components/MyButtom';
import { Div, Text, TextInput } from './styles';
import { CommonActions } from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage'
import { AuthContext } from '../../context/AuthProvider';
import Loading from '../../components/Loading';

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);
  const {signIn} = useContext(AuthContext)

  async function storeUserSession(email, pass) {
    try {
      await EncryptedStorage.setItem(
        "user_session",
        JSON.stringify({
          email,
          pass,
        })
      );
    } catch (error) {
      console.log("Houve um erro ao salvar no cache")
    }
  }

  const entrar = async () => {
      if (email && pass) {
        setLoading(true);
        if(await signIn(email, pass)){
        setLoading(false);
        storeUserSession(email, pass);
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'AppStack'}]
          })
        )
        }else{
          Alert.alert("Erro!", "Houve um erro ao tentar");
        }
      }
  }

  const cadastrar = () => {
    navigation.navigate('SignUp');
  };

  const reset = () => {
    navigation.navigate('ResetPassWord');
  };
  return (
    <Div>

      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        returnKeyType="next"
        onChangeText={t => setEmail(t)}
      />
      <TextInput
        ref={ref => {
          this.passTextInput = ref;
        }}
        secureTextEntry={true}
        placeholder="Senha"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setPass(t)}
      />
      <MyButtom text="Entrar" onClick={entrar} />

      <Text onPress={cadastrar}> Ainda não possui uma conta? </Text>
      <Text onPress={reset}> Esqueceu sua senha? Clique aqui para recupera-lá </Text>
    </Div>
  );
};

export default SignIn;
