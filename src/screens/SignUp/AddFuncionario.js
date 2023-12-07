import React, { useState, useContext } from 'react';
import { View, Alert } from 'react-native';
import MyButtom from '../../components/MyButton';
import { Text, TextInput, Div } from './styles';
import { CommonActions } from '@react-navigation/native';
import { AuthContext } from '../../context/AuthProvider';
import Loading from '../../components/Loading';


const AddFuncionario = ({navigation}) => {
  const [funcionario, setFuncionario] = useState({
    email: '',
    pass: '',
  });
  const {signUp} = useContext(AuthContext);
  const {propriedade} = useContext(AuthContext);  
  
  const cadastrar = async () => {    
  if(funcionario.email && funcionario.pass){
    if(await signUp(funcionario.email, pass, propriedade)){
      navigation.goBack();
    }
  }
  Alert.alert('Erro', 'Preencha todos os campos.');
}

const handleChange = (prop, value) => {
  setFuncionario({ ...funcionario, [prop]: value });
};

return (
  <View>
    <Div>
    <TextInput
      placeholder="Email"
      keyboardType="email-address"
      returnKeyType="next"
      onChangeText={t => handleChange('email', t)}
    />
    <TextInput
      ref={ref => {
        this.passTextInput = ref;
      }}
      secureTextEntry={true}
      placeholder="Senha"
      keyboardType="default"
      returnKeyType="go"
      onChangeText={t => handleChange('pass', t)}
    />
    <MyButtom text="Cadastrar" onClick={cadastrar} />
    </Div>
</View>
);
  };

export default AddFuncionario;
