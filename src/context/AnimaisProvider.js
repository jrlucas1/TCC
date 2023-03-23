import React, { createContext, useState } from 'react';
import { create } from 'apisauce';
import firestore from '@react-native-firebase/firestore'
import { ToastAndroid } from 'react-native';

export const AnimaisContext = createContext({});

export const AnimaisProvider = ({ children }) => {
    const [animais, setAnimais] = useState([]);
    const showToast = (message) => {
        ToastAndroid.show(message, ToastAndroid.SHORT);
    };

    const getAnimais = async () => {
        const unsubscribe = firestore()
            .collection('animais')
            .orderBy('uid')
            .onSnapshot(
                //inscrevendo um listener
                (querySnapshot) => {
                    let d = [];
                    querySnapshot.forEach((doc) => {
                        const val = {
                            uid: doc.id,
                            nome: doc.data().nome,
                            sexo: doc.data().sexo,
                            idade: doc.data().idade,
                            peso: doc.data().peso,
                            situacao: doc.data().situacao
                        };
                        d.push(val);
                    });
                    setAnimais(d);
                },
                (e) => {
                    console.error('CourseProvider, getCousers: ' + e);
                },
            );
        return unsubscribe;
    };
    const saveAnimais = async (val) => {        
        try{
        await firestore()
            .collection('animais')
            .doc(val.uid)
            .set(
                {
                    nome: doc.data().nome,
                    sexo: doc.data().sexo,
                    idade: doc.data().idade,
                    peso: doc.data().peso,
                    situacao: doc.data().situacao
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
                getAnimais,
                saveAnimais,
                deleteAnimais
            }}
        >
            {children}
        </AnimaisContext.Provider>
    );
}