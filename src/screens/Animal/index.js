import React, { useState, useContext, useEffect } from 'react';
import { Alert } from 'react-native';
import { View } from 'react-native';
import MyButtom from '../../components/MyButtom';
import { TextInput } from './styles';
import { Text } from './styles';
import { AnimaisContext } from '../../context/AnimaisProvider';


const Animal = ({ route, navigation }) => {
    const [uid, setUid] = useState('');
    const [nome, setNome] = useState('');
    const [sexo, setSexo] = useState('');
    const [idade, setIdade] = useState('');
    const [peso, setPeso] = useState('');
    const [situacao, setSituacao] = useState('');
    const [loading, setLoading] = useState(true);

    const { saveAnimais } = useContext(AnimaisContext);
    const {deleteAnimais} = useContext(AnimaisContext);

    useEffect(() => {
        console.log(peso);
        setNome('');
        setSexo('');
        setIdade('');
        setPeso('');
        setSituacao('');
        if (route.params.animal) {
            setNome(route.params.animal.nome);
            setSexo(route.params.animal.sexo);
            setIdade(route.params.animal.idade);
            setPeso(route.params.animal.peso);
            setSituacao(route.params.animal.situacao);
            setUid(route.params.animal.uid);
        } return () => {
            console.log('desmontou Animal');
        };

    }, [route]);

    const salvar = async () => {
        if (nome && sexo && idade && peso && situacao) {
            let animal = {}
            animal.uid = uid;
            animal.nome = nome;
            animal.sexo = sexo;
            animal.idade = idade;
            animal.peso = peso;
            animal.situacao = situacao;
            console.log(animal)
            if (await saveAnimais(animal)) {
                Alert.alert('O animal foi inserido com sucesso!')
                navigation.goBack();
            }

        }
    }

    const excluir = async () => {
        Alert.alert('Atenção', 'Você tem certeza que deseja excluir o animal?', [
            {
                text: 'Não',
                onPress: () => { },
                style: 'cancel',
            },
            {
                text: 'Sim',
                onPress: async () => {
                    await deleteAnimais(uid);
                    navigation.goBack();
                },
            },
        ]);
    }

    return (
        <View>
            <TextInput
                placeholder="Nome"
                keyboardType="default"
                returnKeyType="next"
                value={nome}
                onChangeText={t => setNome(t)}
            />
            <TextInput
                placeholder="Sexo"
                keyboardType="default"
                returnKeyType="next"
                value={sexo}
                onChangeText={t => setSexo(t)}
            />
            <TextInput
                placeholder="Idade"
                keyboardType="default"
                returnKeyType="next"
                value={idade}
                onChangeText={t => setIdade(t)}
            />
            <TextInput
                placeholder="Peso"
                keyboardType="default"
                returnKeyType="next"
                value={peso}
                onChangeText={t => setPeso(t)}
            />
            <TextInput
                placeholder="Situação"
                keyboardType="default"
                returnKeyType="next"
                value={situacao}
                onChangeText={t => setSituacao(t)}
            />
            <MyButtom text="Salvar" onClick={salvar} />
            {uid ? <MyButtom text="Excluir" onClick={excluir} /> : null}
        </View>
    );
};

export default Animal;
