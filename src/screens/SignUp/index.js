import React, { useState, useContext } from 'react';
import { View, Alert } from 'react-native';
import MyButtom from '../../components/MyButtom';
import { Text, TextInput } from './styles';
import { CommonActions } from '@react-navigation/native';
import { AuthContext } from '../../context/AuthProvider';
import Loading from '../../components/Loading';


const SignUp = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);
  const {signUp} = useContext(AuthContext);
  
  
  const cadastrar = async () => {    
  if(email && pass){
    let user = {};
    user.email = email;
    setLoading(true);
    if(await signUp(user, pass)){
      setLoading(false);
      navigation.goBack();
    }else{
      console.log()
    }
  }else{
    Alert.alert("O email e a senha não podem ficar em branco!")
  }
}

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
    <MyButtom text="Cadastrar" onClick={cadastrar} />
  </View>
);
  };

export default SignUp;
