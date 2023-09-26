import React, { createContext, useState, useContext, useEffect } from 'react';
import { ToastAndroid } from 'react-native';

import { ApiContext } from '../context/ApiProvider';
import { AuthContext } from './AuthProvider';


export const AtividadeContext = createContext({});

export const AtividadeProvider = ({ children }) => {
    const [atividades, setAtividades] = useState([]);
    const [errorMessage, setErrorMessage] = useState({});
    const { api } = useContext(ApiContext);
    const {propriedade} = useContext(AuthContext);
    useEffect(() =>{
            if(propriedade)      
                if (api) {
                    getAtividades();
            }

    }, [api, propriedade]);

    const showToast = (message) => {
        ToastAndroid.show(message, ToastAndroid.SHORT);
    };

    const getAtividades = async () => {
        try {
                const response = await api.get('/atividades/');
                let data = [];
                response.data.documents.map((d) => {
                    let k = d.name.split(
                        `projects/farmanage1/databases/(default)/documents/propriedades/${propriedade}/atividades`
                    );
                    data.push({
                        desc: d.fields.desc.stringValue,
                        valor: d.fields.valor.stringValue,
                        dataSolicitacao: d.fields.dataSolicitacao.stringValue,
                        dataFim: d.fields.dataFim.stringValue,
                        status: d.fields.status.StringValue,
                        uid: k[1],
                    });
                });
            setAtividades(data);
        } catch (response) {
            setErrorMessage(response);
            console.log('Erro ao buscar via API.');
            console.log(response);
        }
    };

    const saveAtividade = async (val) => {
        try {
            await api.post('/atividades', {
                fields: {
                    desc: { stringValue: val.desc },
                    valor: { stringValue: val.valor },
                    dataSolicitacao: { stringValue: val.dataSolicitacao },
                    dataFim: { stringValue: val.dataFim },
                    status: { stringValue: val.status },
                },
            });
            showToast('Dados salvos.');
            getAtividades();
            return true;
        } catch (response) {
            setErrorMessage(response);
            console.log('Erro ao saveAtividade via API.');
            console.log(response);
            return false;
        }
    };


    const updateAtividade = async (val) => {
        try {
            await api.patch('/atividades' + val.uid, {
                fields: {
                    desc: { stringValue: val.desc },
                    valor: { stringValue: val.valor },
                    dataSolicitacao: { stringValue: val.dataSolicitacao },
                    dataFim: { stringValue: val.dataFim },
                    status: { stringValue: val.status },
                },
            });
            showToast('Dados salvos.');
            getAtividades();
        } catch (response) {
            setErrorMessage(response);
            console.error('Erro ao updateAtividade via API.');
            console.error(response);
        }
    };

    const deleteAtividade = async (val) => {
        try {
            await api.delete('/atividades' + val);
            showToast('Atividade excluída.');
            getAtividades();
        } catch (response) {
            setErrorMessage(response);
            console.log('Erro ao deleteAtividade via API.');
            console.log(response);
        }
    };

    return (
        <AtividadeContext.Provider
            value={{
                atividades,
                getAtividades,
                saveAtividade,
                updateAtividade,
                deleteAtividade,
            }}>
            {children}
        </AtividadeContext.Provider>
    );
};