import React, { useState, useContext } from 'react';
import { View, Alert, Image, StyleSheet} from 'react-native';
import MyButtom from '../../components/MyButtom';
import { Div, Text, TextInput, TextLogin } from './styles';
import { CommonActions } from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage'
import { AuthContext } from '../../context/AuthProvider';
import Loading from '../../components/Loading';

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);
  const {signIn} = useContext(AuthContext)

  
  const styles = StyleSheet.create({
    container: {
      paddingTop: 50,
      alignSelf: "center",
      marginTop: 50
    },
  });
  
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
   <View>
  <Image 
  source={require('../../img/Logo.png')}
  style={styles.container}/>
   <Div>
      <TextInput
        placeholder="email@exemplo.com"
        placeholderTextColor = "#206A5D"
        accessible={true}
        accessibilityLabel="email"
        keyboardType="email-address"
        returnKeyType="next"
        onChangeText={t => setEmail(t)}
      />
      <TextInput
        ref={ref => {
          this.passTextInput = ref;
        }}
        accessible={true}
        accessibilityLabel="senha"
        secureTextEntry={true}
        placeholder="senha"
        placeholderTextColor = "#206A5D"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setPass(t)}
      />
      <MyButtom text="Entrar" onClick={entrar} />

    </Div>
    <Text onPress={reset}> Esqueceu sua senha? Clique aqui para recupera-lá </Text>
    </View>
  );
};

export default SignIn;
