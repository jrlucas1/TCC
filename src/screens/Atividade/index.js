import React, { useState, useContext, useEffect } from 'react';
import { Alert, ToastAndroid, Button } from 'react-native';
import { View } from 'react-native';
import MyButton from '../../components/MyButton';
import { TextInput, Div } from './styles';
import { AtividadeContext } from '../../context/AtividadesProvider';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const Atividade = ({ route, navigation }) => {

    const [atividade, setAtividade] = useState({
        desc: '',
        valor: '',
        dataSolicitacao: '',
        dataFim: '',
        status: '',
    });
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [currentDateField, setCurrentDateField] = useState(null);
    const { saveAtividade, deleteAtividade } = useContext(AtividadeContext);

    const handleChange = (prop, value) => {
        setAtividade({ ...atividade, [prop]: value });
    };

    useEffect(() => {
        if (route.params.atividade) {
            setAtividade(route.params.atividade);
        } return () => {
        }

    }, [route]);

    const salvar = async () => {
        if (atividade.desc && atividade.valor && atividade.dataSolicitacao && atividade.status) {
            if (await saveAtividade(atividade)) {
                ToastAndroid.show('Dados salvos!', ToastAndroid.SHORT);
                navigation.goBack();
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
        if (currentDateField === 'dataFim') {
            atividade.dataFim = date.toISOString().split('T')[0];
        }
        hideDatePicker();
    };

    return (
        <View>
            {!atividade.uid ?
                <Div>
                    <TextInput
                        placeholder="Descrição"
                        placeholderTextColor="#206A5D"
                        keyboardType="default"
                        returnKeyType="next"
                        value={atividade.desc}
                        onChangeText={t => handleChange('desc', t)}
                    />
                    <TextInput
                        placeholder="Valor"
                        placeholderTextColor="#206A5D"
                        keyboardType="default"
                        returnKeyType="next"
                        value={atividade.valor}
                        onChangeText={t => handleChange('valor', t)}
                    />

                    <TextInput
                        placeholder="Status"
                        placeholderTextColor="#206A5D"
                        keyboardType="default"
                        returnKeyType="next"
                        value={atividade.status}
                        onChangeText={t => handleChange('status', t)}
                    />
                    <MyButton text="Salvar" onClick={salvar} />
                    {atividade.uid ? <MyButton text="Excluir" onClick={excluir} /> : null}
                </Div>
                :
                <Div>
                    <TextInput
                        placeholder="Status"
                        placeholderTextColor="#206A5D"
                        keyboardType="default"
                        returnKeyType="next"
                        value={atividade.status}
                        onChangeText={t => handleChange('status', t)}
                    />
                    <Button title="Data fim" onPress={() => showDatePicker('dataFim')} />
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                    />
                    <MyButton text="Salvar" onClick={salvar} />
                    {atividade.uid ? <MyButton text="Excluir" onClick={excluir} /> : null}
                </Div>}

        </View>
    );
};

export default Atividade;
