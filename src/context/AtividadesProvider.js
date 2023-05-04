import React, { createContext, useState, useContext, useEffect } from 'react';
import { ToastAndroid } from 'react-native';

import { ApiContext } from '../context/ApiProvider';
import { createLogger } from 'vite';

export const AtividadeContext = createContext({});

export const AtividadeProvider = ({ children }) => {
    const [atividades, setAtividades] = useState([]);
    const [errorMessage, setErrorMessage] = useState({});
    const { api } = useContext(ApiContext);


    useEffect(() => {
        if (api) {
            getAtividades();
        }
    }, [api]);

    const showToast = (message) => {
        ToastAndroid.show(message, ToastAndroid.SHORT);
    };

    const getAtividades = async () => {
        try {
                const response = await api.get('/atividades');
                //console.log('Dados buscados via API');
                console.log(response.data)
                console.log(response.data.documents)
                let data = [];
                response.data.documents.map((d) => {
                    let k = d.name.split(
                        'projects/farmanage-4c4c8/databases/(default)/documents/atividades/',
                    );
                    console.log(d.fields);
                    console.log(k);
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

    // const getCompanies = async () => {
    //   const unsubscribe = firestore()
    //     .collection('companies')
    //     .orderBy('nome')
    //     .onSnapshot(
    //       //inscrevendo um listener
    //       (querySnapshot) => {
    //         let d = [];
    //         querySnapshot.forEach((doc) => {
    //           // doc.data() is never undefined for query doc snapshots
    //           //console.log(doc.id, ' => ', doc.data());
    //           const val = {
    //             uid: doc.id,
    //             nome: doc.data().nome,
    //             tecnologias: doc.data().tecnologias,
    //           };
    //           d.push(val);
    //         });
    //         //console.log(d);
    //         setCompanies(d);
    //       },
    //       (e) => {
    //         console.error('CompanyProvider, getCompanies: ' + e);
    //       },
    //     );
    //   return unsubscribe;
    // };

    const saveAtividade = async (val) => {
        try {
                await api.post('/atividades/', {
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

    // const saveCompany = async (val) => {
    //   await firestore()
    //     .collection('companies')
    //     .doc(val.uid)
    //     .set(
    //       {
    //         nome: val.nome,
    //         tecnologias: val.tecnologias,
    //       },
    //       {merge: true},
    //     )
    //     .then(() => {
    //       showToast('Dados salvos.');
    //     })
    //     .catch((e) => {
    //       console.error('CompanyProvider, saveCourse: ' + e);
    //     });
    // };

    const updateAtividade = async (val) => {
        //console.log(val);
        try {
            await api.patch('/atividades/' + val.uid, {
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
            console.log('Erro ao updateCompany via API.');
            console.log(response);
        }
    };

    const deleteAtividade = async (val) => {
        try {
            await api.delete('/atividades/' + val);
            showToast('Atividade excluída.');
            getAtividades();
        } catch (response) {
            setErrorMessage(response);
            console.log('Erro ao deleteAtividade via API.');
            console.log(response);
        }
    };

    // const deleteCompany = async (val) => {
    //   firestore()
    //     .collection('companies')
    //     .doc(val)
    //     .delete()
    //     .then(() => {
    //       showToast('Empresa excluída.');
    //     })
    //     .catch((e) => {
    //       console.error('CompanyProvider, deleteCompany: ', e);
    //     });
    // };


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