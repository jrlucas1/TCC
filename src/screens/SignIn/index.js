<<<<<<< HEAD
import React, { useState, useContext } from 'react';
import { View, Alert } from 'react-native';
import MyButtom from '../../components/MyButtom';
import { Text, TextInput } from './styles';
import { CommonActions } from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage'
import { AuthContext } from '../../context/AuthProvider';
import Loading from '../../components/Loading';

=======
import React, {useState} from 'react';
import MyButtom from '../../components/MyButtom';
import auth from '@react-native-firebase/auth';
import {
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import {COLORS} from '../../assets/colors';
import Loading from '../../components/Loading';
>>>>>>> 069b065aebb480c38b0d03f7e934e55b231fc405
// import { Container } from './styles';
import EncryptedStorage from 'react-native-encrypted-storage';

<<<<<<< HEAD
const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);
  const {signIn} = useContext(AuthContext)
=======
const SignIn = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  //console.log(auth);
>>>>>>> 069b065aebb480c38b0d03f7e934e55b231fc405

  async function storeUserSession(email, pass) {
    try {
      await EncryptedStorage.setItem(
<<<<<<< HEAD
        "user_session",
        JSON.stringify({
          email,
          pass,
        })
      );
    } catch (error) {
      console.log("Houve um erro ao salvar no cache")
=======
        'user_session',
        JSON.stringify({
          email,
          pass,
        }),
      );
    } catch (error) {
      console.error('SignIn, storeUserSession: ' + error);
>>>>>>> 069b065aebb480c38b0d03f7e934e55b231fc405
    }
  }

  const entrar = async () => {
<<<<<<< HEAD
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

      <Text onPress={cadastrar}> Cadastrar </Text>
      <Text onPress={reset}> Resetar senha </Text>
    </View>
=======
    if (email && password) {
      try {
        setLoading(true);
        await auth().signInWithEmailAndPassword(email, password);
        await storeUserSession(email, password);
        setLoading(false);
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'AppStack'}],
          }),
        );
      } catch (e) {
        setLoading(false);
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
    }
  };

  const recuperarSenha = () => {
    alert('foi');
  };

  const cadastrar = () => {
    alert('foi');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.divSuperior}>
          <Image
            style={styles.image}
            source={require('../../assets/images/logo.png')}
            accessibilityLabel="logo do app"
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            returnKeyType="next"
            onChangeText={t => setEmail(t)}
          />
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder="Senha"
            keyboardType="default"
            returnKeyType="go"
            onChangeText={t => setPassword(t)}
          />
          <Text style={styles.textEsqueceuSenha} onPress={recuperarSenha}>
            Esqueceu sua senha?
          </Text>
          <MyButtom text="ENTRAR" onClick={entrar} />
        </View>
        <View style={styles.divInferior}>
          <View style={styles.divOuHr}>
            <View style={styles.divHr} />
            <Text style={styles.textOu}>OU</Text>
            <View style={styles.divHr} />
          </View>
          <View style={styles.divCadastrarSe}>
            <Text style={styles.textNormal}>Não tem uma conta?</Text>
            <Text style={styles.textCadastrarSe} onPress={cadastrar}>
              Cadastre-se
            </Text>
          </View>
        </View>
      </ScrollView>
      {loading && <Loading />}
    </SafeAreaView>
>>>>>>> 069b065aebb480c38b0d03f7e934e55b231fc405
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  divSuperior: {
    flex: 5,
    alignItems: 'center',
  },
  divInferior: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  },
  image: {
    width: 150,
    height: 150,
    margin: 5,
  },
  input: {
    width: '95%',
    height: 50,
    borderBottomColor: COLORS.grey,
    borderBottomWidth: 2,
    fontSize: 16,
    paddingLeft: 2,
    paddingBottom: 1,
  },
  textEsqueceuSenha: {
    fontSize: 15,
    color: COLORS.accentSecundary,
    alignSelf: 'flex-end',
    marginTop: 10,
    marginBottom: 10,
  },
  divOuHr: {
    width: '100%',
    height: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  divHr: {
    width: '30%',
    height: 1,
    borderBottomColor: COLORS.grey,
    borderBottomWidth: 2,
  },
  textOu: {
    marginLeft: 20,
    marginRight: 20,
    fontSize: 20,
    color: COLORS.grey,
  },
  divCadastrarSe: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  textNormal: {
    fontSize: 18,
  },
  textCadastrarSe: {
    fontSize: 16,
    color: COLORS.accentSecundary,
    marginLeft: 5,
  },
});
