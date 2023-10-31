import React, { useState, useContext, useEffect } from 'react';
import { Alert, ToastAndroid , Button} from 'react-native';
import { View } from 'react-native';
import MyButton from '../../components/MyButton';
import { TextInput, Div} from './styles';
import { Text } from './styles';
import { AtividadeContext } from '../../context/AtividadesProvider';
import DateTimePickerModal from 'react-native-modal-datetime-picker';



const Atividade = ({ route, navigation }) => {
    const [uid, setUid] = useState('');
    const [desc, setDesc] = useState('');
    const [valor, setValor] = useState('');
    const [dataSolicitacao, setDataSolicitacao] = useState('');
    const [dataFim, setDataFim] = useState('');
    const [status, setStatus] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [currentDateField, setCurrentDateField] = useState(null);

    const { saveAtividade, deleteAtividade, updateAtividade } = useContext(AtividadeContext);
    

    useEffect(() => {
        setDesc('');
        setValor('');
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];
        setDataSolicitacao(formattedDate);
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

    const showDatePicker = (field) => {
        setCurrentDateField(field);
        setDatePickerVisibility(true);
      };
    
      const hideDatePicker = () => {
        setDatePickerVisibility(false);
      };
    
      const handleConfirm = (date) => {
        if (currentDateField === 'dataSolicitacao') {
          setDataSolicitacao(date.toISOString().split('T')[0]);
        } else if (currentDateField === 'dataFim') {
          setDataFim(date.toISOString().split('T')[0]);
        }
        hideDatePicker();
      };

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
                placeholder="Status"
                placeholderTextColor="#206A5D"
                keyboardType="default"
                returnKeyType="next"
                value={status}
                onChangeText={t => setStatus(t)}
            />
            <MyButton text="Salvar" onClick={salvar} />
            {uid ? <MyButton text="Excluir" onClick={excluir} /> : null}
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
            <Button title="Data fim" onPress={() => showDatePicker('dataFim')} />
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
            <MyButton text="Salvar" onClick={salvar} />
            {uid ? <MyButton text="Excluir" onClick={excluir} /> : null}
            </Div>}
            
        </View>
    );
};

export default Atividade;
