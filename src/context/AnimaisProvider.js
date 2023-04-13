import React, { createContext, useState, useEffect } from 'react';
import { create } from 'apisauce';
import firestore from '@react-native-firebase/firestore'
import { ToastAndroid } from 'react-native';

export const AnimaisContext = createContext({});
// banco de dados coleção de documentos
export const AnimaisProvider = ({ children }) => {
    const [animais, setAnimais] = useState([]);
    const showToast = (message) => {
        ToastAndroid.show(message, ToastAndroid.SHORT);
    };

    useEffect(() => {
        const unsubscribe = 
            firestore()
            .collection('animais')
            .orderBy('nome')
            .onSnapshot(
                snapShot => {
                    let data = [];
                    snapShot.forEach((doc) => {
                        const val = ({
                            uid: doc.id,
                            nome: doc.data().nome,
                            sexo: doc.data().sexo,
                            idade: doc.data().idade,
                            peso: doc.data().peso,
                            situacao: doc.data().situacao
                        });
                        data.push(val)
                    });
                    setAnimais(data);
                },
                (e) => {
                    console.error('AnimaisProvider, getAnimais: ' + e);
                },
            );
        return unsubscribe;
    });
    const saveAnimais = async (val) => {        
        try{
        await firestore()
            .collection('animais')
            .doc(val.uid)
            .set(
                {
                    nome: val.nome,
                    sexo: val.sexo,
                    idade: val.idade,
                    peso: val.peso,
                    situacao: val.situacao
                },
                { merge: true },
            )
                showToast('Dados salvos.');
        }catch(error){
            console.log("AnimaisProvider, saveAnimais:" + error);
        }
    };

    const deleteAnimais = async (val) => {
        firestore()
            .collection('animais')
            .doc(val)
            .delete()
            .then(() => {
                showToast('Animal excluído.');
            })
            .catch((e) => {
                console.error('AnimalProvider, deleteAnimais: ', e);
            });
    };

    return (
        <AnimaisContext.Provider
            value={{
                animais,
                saveAnimais,
                deleteAnimais
            }}
        >
            {children}
        </AnimaisContext.Provider>
    );
}