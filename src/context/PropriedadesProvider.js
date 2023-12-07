import React, { createContext, useState, useEffect } from 'react';
import { create } from 'apisauce';
import firestore from '@react-native-firebase/firestore'
import { ToastAndroid } from 'react-native';


export const PropriedadesContext = createContext({});

export const PropriedadesProvider = ({ children }) => {
    const [propriedades, setPropriedades] = useState([]);
    const showToast = (message) => {
        ToastAndroid.show(message, ToastAndroid.SHORT);
    };


    useEffect(() => {
        const unsubscribe = 
            firestore()
            .collection('propriedades')
            .orderBy('nome')
            .onSnapshot(
                snapShot => {
                    let data = [];
                    snapShot.forEach((doc) => {
                        const val = ({
                            uid: doc.id,
                            nome: doc.data().nome,
                            latitude: doc.data().latitude,
                            longitude: doc.data().longitude,
                            descricao: doc.data().descricao,
                        });
                        data.push(val)
                    });
                    setPropriedades(data);
                },
                (e) => {
                    console.error('PropriedadesProvider, getPropriedades: ' + e);
                },
            );
        return unsubscribe;
    });
    const savePropriedade = async (val) => {        
        try{
        await firestore()
            .collection('propriedades')
            .doc(val.uid)
            .set(val,{ merge: true })

            showToast('Dados salvos.');
        }catch(error){
            console.log("PropriedadesProvider, savePropriedades:" + error);
            return false;
        }
    };

    const deletePropriedade = async (val) => {
       try{
        await firestore()
            .collection('propriedades')
            .doc(val.uid)
            .delete()
            showToast('Dados excluídos.');
       }catch(error){
           console.log("PropriedadesProvider, deletePropriedades:" + error);
           return false;
       }
    };

    return (
        <PropriedadesContext.Provider
            value={{
                propriedades,
                savePropriedade,
                deletePropriedade
            }}
        >
            {children}
        </PropriedadesContext.Provider>
    );
}