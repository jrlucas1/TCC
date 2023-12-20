import React, { useState, useContext, useCallback } from 'react';
import { View, Alert } from 'react-native';
import MyButtom from '../../components/MyButton';
import { TextInput, Div } from './styles';
import { AuthContext } from '../../context/AuthProvider';
import debounce from 'lodash/debounce';


const AddFuncionario = ({ navigation }) => {
  const [funcionario, setFuncionario] = useState({
    email: '',
    pass: '',
  });
  const { signUp, propriedade } = useContext(AuthContext);

  const cadastrar = async () => {
    if (funcionario.email && funcionario.pass) {
      if (await signUp(funcionario.email, pass, propriedade)) {
        navigation.goBack();
      }
    }
    if (!funcionario.email || !funcionario.pass)
      Alert.alert('Erro', 'Preencha todos os campos.');
  }

  const debouncedChange = useCallback(
    debounce((field, value) => {
      console.log("Field:" + field, " Value:" + value);
      setFuncionario((prevState) => ({ ...prevState, [field]: value }));
    }, 500),
    []
  );

  const handleChange = useCallback((field, value) => {
    debouncedChange(field, value);
  }
    , []);


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
