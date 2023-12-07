import React, { useState, useContext, useEffect } from 'react';
import { Alert, ToastAndroid } from 'react-native';
import { View } from 'react-native';
import MyButton from '../../components/MyButton';
import { TextInput, Div } from './styles';
import { PropriedadesContext } from '../../context/PropriedadesProvider';


const Propriedade = ({ route, navigation }) => {

    const [propriedade, setPropriedade] = useState({
        uid: '',
        nome: '',
        latitude: '',
        longitude: '',
        descricao: '',
    })
    const {savePropriedade, deletePropriedade} = useContext(PropriedadesContext);

    useEffect(() => {
        if (route.params.propriedade){
            setPropriedade(route.params.propriedade)
        };
    }, [route]);

    const salvar = async () => {
        if (propriedade.nome && propriedade.latitude && propriedade.longitude && propriedade.descricao) {
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
    
    const handleChange = (prop, value) => {
        setAtividade({ ...atividade, [prop]: value });
    };

    return (
        <View>
            <Div>
            <TextInput
                placeholder="Nome"
                keyboardType="default"
                returnKeyType="next"
                value={nome}
                onChangeText={t => handleChange('nome',t)}
            />
            <TextInput
                placeholder="Latitude"
                keyboardType="default"
                returnKeyType="next"
                value={latitude}
                onChangeText={t => handleChange('latitude', t)}
            />
            <TextInput
                placeholder="Longitude"
                keyboardType="default"
                returnKeyType="next"
                value={longitude}
                onChangeText={t => handleChange('longitude', t)}
            />
            <TextInput
                placeholder="Descricao"
                keyboardType="default"
                returnKeyType="next"
                value={descricao}
                onChangeText={t => handleChange('descricao',t)}
            />
            <MyButton text="Salvar" onClick={salvar} />
            {uid ? <MyButton text="Excluir" onClick={excluir} /> : null}
            </Div>
        </View>
    );
};

export default Propriedade;
