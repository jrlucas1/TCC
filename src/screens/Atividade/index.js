import React, { useState, useContext, useEffect } from 'react';
import { Alert, ToastAndroid } from 'react-native';
import { View } from 'react-native';
import MyButtom from '../../components/MyButtom';
import { TextInput, Div} from './styles';
import { Text } from './styles';
import { AtividadeContext } from '../../context/AtividadesProvider';


const Atividade = ({ route, navigation }) => {
    const [uid, setUid] = useState('');
    const [desc, setDesc] = useState('');
    const [valor, setValor] = useState('');
    const [dataSolicitacao, setDataSolicitacao] = useState('');
    const [dataFim, setDataFim] = useState('');
    const [status, setStatus] = useState('');

    const { saveAtividade, deleteAtividade, updateAtividade } = useContext(AtividadeContext);

    useEffect(() => {
        setDesc('');
        setValor('');
        setDataSolicitacao('');
        setDataFim('');
        setStatus('');
        if (route.params.atividade) {
            setDesc(route.params.atividade.desc);
            setValor(route.params.atividade.valor);
            setDataSolicitacao(route.params.atividade.dataSolicitacao);
            setDataFim(route.params.atividade.dataFim);
            setStatus(route.params.atividade.status);
            setUid(route.params.atividade.uid);
        } return () => {
            console.log('desmontou Atividade');
        };

    }, [route]);

    const salvar = async () => {
        if (desc && valor && dataSolicitacao && status) {
            let atividade = {}
            atividade.uid = uid;
            atividade.desc = desc;
            atividade.valor = valor;
            atividade.dataSolicitacao = dataSolicitacao;
            atividade.dataFim = dataFim;
            atividade.status = status;
            console.log(atividade)
            if (!uid){
                if(await saveAtividade(atividade)){
                ToastAndroid.show('Dados salvos!', ToastAndroid.SHORT);
                navigation.goBack();
                }
            }else{
                if(await updateAtividade(atividade)){
                    ToastAndroid.show('Dados salvos!', ToastAndroid.SHORT);
                    navigation.goBack();
                }
            }

        }
    }

    const excluir = async () => {
        Alert.alert('Atenção', 'Você tem certeza que deseja excluir a atividade?', [
            {
                text: 'Não',
                onPress: () => { },
                style: 'cancel',
            },
            {
                text: 'Sim',
                onPress: async () => {
                    await deleteAtividade(uid);
                    navigation.goBack();
                },
            },
        ]);
    }

    return (
        <View>
            {!uid ?
            <Div>
            <TextInput
                placeholder="Descrição"
                placeholderTextColor="#206A5D"
                keyboardType="default"
                returnKeyType="next"
                value={desc}
                onChangeText={t => setDesc(t)}
            />
            <TextInput
                placeholder="Valor"
                placeholderTextColor="#206A5D"
                keyboardType="default"
                returnKeyType="next"
                value={valor}
                onChangeText={t => setValor(t)}
            />
            <TextInput
                placeholder="Data da solicitação"
                placeholderTextColor="#206A5D"
                keyboardType="default"
                returnKeyType="next"
                value={dataSolicitacao}
                onChangeText={t => setDataSolicitacao(t)}
            />
            <TextInput
                placeholder="Data do fim da atividade"
                placeholderTextColor="#206A5D"
                keyboardType="default"
                returnKeyType="next"
                value={dataFim}
                onChangeText={t => setDataFim(t)}
            />
            <TextInput
                placeholder="Status"
                placeholderTextColor="#206A5D"
                keyboardType="default"
                returnKeyType="next"
                value={status}
                onChangeText={t => setStatus(t)}
            />
            </Div>
            :   
            <Div>
            <TextInput
                placeholder="Status"
                placeholderTextColor="#206A5D"
                keyboardType="default"
                returnKeyType="next"
                value={status}
                onChangeText={t => setStatus(t)}
            />
            </Div>}
            <MyButtom text="Salvar" onClick={salvar} />
            {uid ? <MyButtom text="Excluir" onClick={excluir} /> : null}
        </View>
    );
};

export default Atividade;
