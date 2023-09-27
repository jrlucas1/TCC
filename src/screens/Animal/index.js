import React, { useState, useContext, useEffect } from 'react';
import { Alert, DatePickerIOSComponent, ToastAndroid } from 'react-native';
import { View } from 'react-native';
import MyButtom from '../../components/MyButtom';
import { TextInput } from './styles';
import { Text } from './styles';
import { AnimaisContext } from '../../context/AnimaisProvider';
import {Picker} from '@react-native-picker/picker';


const Animal = ({ route, navigation }) => {
    const [uid, setUid] = useState('');
    const [nome, setNome] = useState('');
    const [sexo, setSexo] = useState('');
    const [idade, setIdade] = useState('');
    const [peso, setPeso] = useState('');
    const [situacao, setSituacao] = useState('');

    const { saveAnimais } = useContext(AnimaisContext);
    const {deleteAnimais} = useContext(AnimaisContext);

    useEffect(() => {
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
            console.log(sexo)
            if (await saveAnimais(animal)) {
                ToastAndroid.show('Dados salvos!', ToastAndroid.SHORT);
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
            
            <Picker 
                selectedValue={sexo}
                onValueChange={(itemValue, itemIndex) => setSexo(itemValue)}
                style={{ backgroundColor: '#fff', borderRadius: 5, borderWidth: 1, borderColor: '#000', paddingHorizontal: 10 }}
                itemStyle={{ fontSize: 16, color: '#000', textAlign: 'center' }}
            >
                <Picker.Item label="Feminino" value="F" />
                <Picker.Item label="Masculino" value="M" />
            </Picker>
            
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
            

            <Picker selectedValue={situacao}
            onValueChange={(itemValue, itemIndex) => setSituacao(itemValue)} >
                <Picker.Item label="Prenha" value="Prenha" />
                <Picker.Item label="Vazia" value="Vazia" />
            </Picker>

            <MyButtom text="Salvar" onClick={salvar} />
            <MyButtom text="Voltar" onClick={() => navigation.goBack()} />
            {uid ? <MyButtom text="Excluir" onClick={excluir} /> : null}
        </View>
    );
};

export default Animal;
