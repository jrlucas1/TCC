import React, { createContext, useState, useContext, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore'
import { AuthContext } from './AuthProvider';


export const AtividadeContext = createContext({});

export const AtividadeProvider = ({ children }) => {
    const [atividades, setAtividades] = useState([]);
    const {propriedade} = useContext(AuthContext);
    
    useEffect(() =>{
        getAtividades();
    }, [atividades]);


    const getAtividades = async () => {
        try {
           const snapshot = await firestore()
              .collection('propriedades')
                .doc(propriedade)
                .collection('atividades')
                .get();

                let data = [];
                snapshot.forEach((doc) => {
                    const val = {
                        uid: doc.id,
                        desc: doc.data().desc,
                        valor: doc.data().valor,
                        dataSolicitacao: doc.data().dataSolicitacao,
                        dataFim: doc.data().dataFim,
                        status: doc.data().status,
                    }
                    data.push(val);
                });
            setAtividades(data);
        } catch (response) {
            console.log('getAtividades:' + response);
        }
    };

    const saveAtividade = async (val) => {
        try {
            firestore()
            .collection('propriedades')
            .doc(propriedade)
            .collection('atividades')
            .doc(val.uid)
            .set(val,{merge: true});
            showToast('Dados salvos.');
        } catch (response) {
            setErrorMessage(response);
            console.log('Erro ao saveAtividade:' + response);
            return false;
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
                deleteAtividade,
            }}>
            {children}
        </AtividadeContext.Provider>
    );
};