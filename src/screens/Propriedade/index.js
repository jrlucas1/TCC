import React, { useState, useContext, useEffect } from 'react';
import { Alert, ToastAndroid } from 'react-native';
import { View } from 'react-native';
import MyButtom from '../../components/MyButtom';
import { TextInput } from './styles';
import { Text } from './styles';
import { PropriedadesContext } from '../../context/PropriedadesProvider';


const Propriedade = ({ route, navigation }) => {
    const [uid, setUid] = useState('');
    const [nome, setNome] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [descricao, setDescricao] = useState('');


    const {savePropriedade, deletePropriedade} = useContext(PropriedadesContext);

    useEffect(() => {
        setNome('');
        setLatitude('');
        setLongitude('');
        setDescricao('');

        if (route.params.propriedade) {
            setNome(route.params.propriedade.nome);
            setLatitude(route.params.propriedade.sexo);
            setLongitude(route.params.propriedade.idade);
            setDescricao(route.params.propriedade.peso);
            setUid(route.params.propriedade.uid);
        } return () => {
            console.log('desmontou Propriedade');
        };

    }, [route]);

    const salvar = async () => {
        if (nome && latitude && longitude && descricao) {
            let propriedade = {}
            propriedade.uid = uid;
            propriedade.nome = nome;
            propriedade.latitude = latitude;
            propriedade.longitude = longitude;
            propriedade.descricao = descricao;

            console.log(propriedade)
            if (await savePropriedade(propriedade)) {
                ToastAndroid.show('Dados salvos!', ToastAndroid.SHORT);
                navigation.goBack();
            }

        }
    }

    const excluir = async () => {
        Alert.alert('Atenção', 'Você tem certeza que deseja excluir a propriedade?', [
            {
                text: 'Não',
                onPress: () => { },
                style: 'cancel',
            },
            {
                text: 'Sim',
                onPress: async () => {
                    await deletePropriedade(uid);
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
                placeholder="Latitude"
                keyboardType="default"
                returnKeyType="next"
                value={latitude}
                onChangeText={t => setLatitude(t)}
            />
            <TextInput
                placeholder="Longitude"
                keyboardType="default"
                returnKeyType="next"
                value={longitude}
                onChangeText={t => setLongitude(t)}
            />
            <TextInput
                placeholder="Descricao"
                keyboardType="default"
                returnKeyType="next"
                value={descricao}
                onChangeText={t => setDescricao(t)}
            />
            <MyButtom text="Salvar" onClick={salvar} />
            {uid ? <MyButtom text="Excluir" onClick={excluir} /> : null}
        </View>
    );
};

export default Propriedade;
