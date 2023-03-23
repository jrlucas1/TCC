import React, { useState, useContext } from 'react';
import { View} from 'react-native';
import MyButtom from '../../components/MyButtom';
import {TextInput } from './styles';
import {Text} from './styles';
import { AnimaisContext } from '../../context/AnimaisProvider';
import Loading from '../../components/Loading';


const Animais = ({ navigation }) => {
    const [uid, setUid] = useState('');
    const [nome, setNome] = useState('');
    const [sexo, setSexo] = useState('');
    const [idade, setIdade] = useState('');
    const [peso, setPeso] = useState('');
    const [situacao, setSituacao] = useState('');
    const [loading, setLoading] = useState(true);

    const {saveAnimais} = useContext(AnimaisContext);


    const salvar = async () => {
        if(nome && sexo && idade && peso && situacao){
            let animal = {}
            animal.uid = uid;
            animal.nome = nome;
            animal.sexo = sexo;
            animal.idade = idade;
            animal.peso = peso;
            animal.situacao = situacao;
            console.log(animal)
            if(await saveAnimais(animal)){
                Alert.alert('O animal foi inserido com sucesso!')
            }

        }
    }

    const voltar = () =>{
        navigation.navigate('Home');
    };
    return (
        <View>
            <TextInput
                placeholder="Nome"
                keyboardType="default"
                returnKeyType="next"
                onChangeText={t => setNome(t)}
            />
            <TextInput
                placeholder="Sexo"
                keyboardType="default"
                returnKeyType="next"
                onChangeText={t => setSexo(t)}
            />
            <TextInput
                placeholder="Idade"
                keyboardType="default"
                returnKeyType="next"
                onChangeText={t => setIdade(t)}
            />
            <TextInput
                placeholder="Peso"
                keyboardType="default"
                returnKeyType="next"
                onChangeText={t => setPeso(t)}
            />
            <TextInput
                placeholder="Situação"
                keyboardType="default"
                returnKeyType="next"
                onChangeText={t => setSituacao(t)}
            />
            <MyButtom text="Cadastrar animal" onClick={salvar} />
            <MyButtom text="Voltar" onClick={voltar} />

        </View>
    );
};

export default Animais;
