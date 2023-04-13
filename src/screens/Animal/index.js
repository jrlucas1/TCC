import React, { useState, useContext, useEffect } from 'react';
import { View} from 'react-native';
import MyButtom from '../../components/MyButtom';
import {TextInput } from './styles';
import {Text} from './styles';
import { AnimaisContext } from '../../context/AnimaisProvider';


const Animal = ({route, navigation }) => {
    const [uid, setUid] = useState('');
    const [nome, setNome] = useState('');
    const [sexo, setSexo] = useState('');
    const [idade, setIdade] = useState('');
    const [peso, setPeso] = useState('');
    const [situacao, setSituacao] = useState('');
    const [loading, setLoading] = useState(true);

    const {saveAnimais} = useContext(AnimaisContext);

    useEffect(()=>{
        setNome('');
        setSexo('');
        setIdade('');
        setPeso('');
        setSituacao('');
        if(route.params.animal){
            setNome(route.params.animal.nome);
            setSexo(route.params.animal.sexo);
            setIdade(route.params.animal.idade);
            setPeso(route.params.animal.peso);
            setSituacao(route.params.animal.situacao);
        }
    })
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

        </View>
    );
};

export default Animal;
