import React, { useState, useContext, useEffect, useCallback} from 'react';
import { Alert, ToastAndroid } from 'react-native';
import { View } from 'react-native';
import MyButton from '../../components/MyButton';
import { TextInput, Div } from './styles';
import { AnimaisContext } from '../../context/AnimaisProvider';
import ModalSelector from 'react-native-modal-selector'

const Animal = ({ route, navigation }) => {
    const [animal, setAnimal] = useState({
        nome: '',
        sexo: '',
        idade: '',
        peso: '',
        situacao: '',
    });
    const { saveAnimais, deleteAnimais } = useContext(AnimaisContext);

    const debouncedChange = useCallback(
        debounce((prop, value) => {
            console.log("Prop:" + prop, " Value:" + value);
            setAnimal((prevState) => ({ ...prevState, [prop]: value }));
        }, 500),
        []
    );

    const handleChange = useCallback((prop, value) => {
        debouncedChange(prop, value);
    }
    , []);


    const dataGender = [
        { key: 1, label: 'M' },
        { key: 2, label: 'F' }
    ];
    
    const dataStatus = [
        { key: 1, label: 'Prenha' },
        { key: 2, label: 'Vazia' }
    ];

    const modalStyle = {
        borderWidth: 1, 
        borderColor: '#000', 
        borderRadius: 10,
        backgroundColor: '#FFF',
        color: '#000',
    }
    
    useEffect(() => {
        if (route.params.animal) {
           setAnimal(route.params.animal);
        } return () => {
        };

    }, [route]);

    const salvar = async () => {
        if (animal.nome && animal.sexo && animal.idade && animal.peso) {
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
                    await deleteAnimais(animal.uid);
                    navigation.goBack();
                },
            },
        ]);
    }

    return (
        <View>
            <Div>
                {!animal.uid ? (
                    <>
                        <TextInput
                            placeholder="Nome"
                            keyboardType="default"
                            returnKeyType="next"
                            value={animal.nome}
                            onChangeText={t => handleChange('nome',t)}
                        />
                        <ModalSelector
                            data={dataGender}
                            initValue="Sexo"
                            style = {modalStyle}
                            onChange={(option)=>{
                                handleChange('sexo',option.label);

                            }}
                        />
                        <TextInput
                            placeholder="Idade"
                            keyboardType="default"
                            returnKeyType="next"
                            value={animal.idade}
                            onChangeText={t => handleChange('idade',t)}
                        />
                        <TextInput
                            placeholder="Peso"
                            keyboardType="default"
                            returnKeyType="next"
                            value={animal.peso}
                            onChangeText={t => handleChange('peso',t)}
                        />
                        {animal.sexo === 'F' ? (
                            <ModalSelector
                                data={dataStatus}
                                initValue="Situação"
                                style = {modalStyle}
                                onChange={(option)=>{handleChange('situacao',option.label) 
                                }}
                            />
                        ) : null}
                    </>
                ) : (
                    <>
                        <TextInput
                            placeholder="Idade"
                            keyboardType="default"
                            returnKeyType="next"
                            value={animal.idade}
                            onChangeText={t => handleChange('idade',t)}
                        />
                        <TextInput
                            placeholder="Peso"
                            keyboardType="default"
                            returnKeyType="next"
                            value={animal.peso}
                            onChangeText={t => handleChange('peso',t)}
                        /> 
                        {animal.sexo === 'F' ? (
                            <ModalSelector
                                data={dataStatus}
                                initValue="Situação"
                                style = {modalStyle}
                                onChange={(option)=>{handleChange('situacao',option.label)
                                console.log(situacao)}}
                            />
                        ) : null}
                    </>
                )}
                <MyButton text="Salvar" onClick={salvar} />
                <MyButton text="Voltar" onClick={() => navigation.goBack()} />
                {animal.uid ? <MyButton text="Excluir" onClick={excluir} /> : null}
            </Div>
        </View>
    );
};

export default Animal;