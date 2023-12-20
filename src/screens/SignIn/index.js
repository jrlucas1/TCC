import React, { useState, useContext } from 'react';
import { Alert, Image, StyleSheet } from 'react-native';
import { AuthContext } from '../../context/AuthProvider';
import MyButton from '../../components/MyButton';
import { Text, TextInput, View } from './styles';

const SignIn = ({ navigation }) => {
  const [user, setUser] = useState({
    email: '',
    pass: '',
  });
  const { signIn, storeUserSession } = useContext(AuthContext);

  const styles = StyleSheet.create({
    container: {
      width: 250,
      height: 250,
      resizeMode: 'contain',
      marginTop: -200,
    },
  });


  const entrar = async () => {
    if (await signIn(user.email, user.pass)) {
      navigation.navigate('Preload');
      storeUserSession(user.email, user.pass);
    }

    if (user.email === '' || user.pass === '')
      Alert.alert('Erro!', 'Preencha todos os campos!');
  };

  const reset = () => {
    navigation.navigate('ResetPassWord');
  };

  const handleChange = (prop, value) => {
    setUser({ ...user, [prop]: value });
  }

  return (
    <View>
      <Image
        source={require('../../img/Logo.png')}
        style={styles.container}
      />
      <TextInput
        placeholder="email@exemplo.com"
        placeholderTextColor="#206A5D"
        accessible={true}
        accessibilityLabel="email"
        testID="email"
        keyboardType="email-address"
        returnKeyType="next"
        onChangeText={(t) => handleChange('email', t)}
      />
      <TextInput
        ref={(ref) => {
          this.passTextInput = ref;
        }}
        accessible={true}
        accessibilityLabel="senha"
        testID="senha"
        secureTextEntry={true}
        placeholder="senha"
        placeholderTextColor="#206A5D"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={(t) => handleChange('pass', t)}
      />
      <MyButton text="Entrar" onClick={entrar} />
      <Text onPress={reset}>
        Esqueceu sua senha? Clique aqui para recuperá-la
      </Text>
    </View>
  );
};

export default SignIn;