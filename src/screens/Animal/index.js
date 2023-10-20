import React, { useState, useContext, useEffect } from 'react';
import { Alert, DatePickerIOSComponent, Modal, ToastAndroid } from 'react-native';
import { View } from 'react-native';
import MyButton from '../../components/MyButton';
import { TextInput, Div } from './styles';
import { Text } from './styles';
import { AnimaisContext } from '../../context/AnimaisProvider';
import ModalSelector from 'react-native-modal-selector'
import MyButton from '../../components/MyButton';


const Animal = ({ route, navigation }) => {
    const [uid, setUid] = useState('');
    const [nome, setNome] = useState('');
    const [sexo, setSexo] = useState('');
    const [idade, setIdade] = useState('');
    const [peso, setPeso] = useState('');
    const [situacao, setSituacao] = useState('');
    const { saveAnimais } = useContext(AnimaisContext);
    const { deleteAnimais } = useContext(AnimaisContext);
    
    
    let index = 0;

    const dataGender = [
        { key: index++, label: 'M' },
        { key: index++, label: 'F' }
    ];
    
    const dataStatus = [
        { key: index++, label: 'Prenha' },
        { key: index++, label: 'Vazia' }
    ];

    const modalStyle = {
        borderWidth: 2, 
        borderColor: '#000', 
        borderRadius: 10,
        marginRight: 40,
        marginLeft: 40,
        backgroundColor: '#FFF',
        color: '#000',
    }



    

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
        console.log(nome, sexo, idade, peso, situacao)
        if (nome && sexo && idade && peso) {
            let animal = {}
            animal.uid = uid;
            animal.nome = nome;
            animal.sexo = sexo;
            animal.idade = idade;
            animal.peso = peso;
            animal.situacao = situacao;
            console.log(animal)
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
            <Div>
                {!uid ? (
                    <>
                        <TextInput
                            placeholder="Nome"
                            keyboardType="default"
                            returnKeyType="next"
                            value={nome}
                            onChangeText={t => setNome(t)}
                        />
                        <ModalSelector
                            data={dataGender}
                            initValue="Sexo"
                            style = {modalStyle}
                            onChange={(option)=>{setSexo(option.label) 
                            console.log(sexo)}}
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
                        {sexo === 'F' ? (
                            <ModalSelector
                                data={dataStatus}
                                initValue="Situação"
                                style = {modalStyle}
                                onChange={(option)=>{setSituacao(option.label) 
                                console.log(situacao)}}
                            />
                        ) : null}
                        <MyButton text="Salvar" onClick={salvar} />
                    </>
                ) : (
                    <>
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
                        {sexo === 'F' ? (
                            <ModalSelector
                                data={dataStatus}
                                initValue="Situação"
                                style = {modalStyle}
                                onChange={(option)=>{setSituacao(option.label) 
                                console.log(situacao)}}
                            />
                        ) : null}
                    </>
                )}
                <MyButton text="Voltar" onClick={() => navigation.goBack()} />
                {uid ? <MyButton text="Excluir" onClick={excluir} /> : null}
            </Div>
        </View>
    );
};

export default Animal;