import React, { createContext, useState, useEffect, useContext } from 'react';
import firestore from '@react-native-firebase/firestore'
import { AuthContext } from './AuthProvider';
import { ToastAndroid } from 'react-native';

export const AnimaisContext = createContext({});

export const AnimaisProvider = ({ children }) => {
    const [animais, setAnimais] = useState([]);
    const showToast = (message) => {
        ToastAndroid.show(message, ToastAndroid.SHORT);
    };
    const {propriedade} = useContext(AuthContext);

    const getAnimais = async () => {
        try{
            firestore()
            .collection("propriedades")
            .doc(propriedade)
            .collection("animais")
            .orderBy("nome")
            .onSnapshot(
                snapShot => {
                    let data = [];
                    snapShot.forEach((doc) => {
                        const val = {
                            uid: doc.id,
                            nome: doc.data().nome,
                            sexo: doc.data().sexo,
                            idade: doc.data().idade,
                            peso: doc.data().peso,
                            situacao: doc.data().situacao
                        };
                        data.push(val)
                    });
                    setAnimais(data);
                },);
        } catch(error){
            console.log("AnimaisProvider, getAnimais:" + error);
        }
    };

    const saveAnimais = async (val) => {        
        try{
        await firestore()
            .collection('propriedades')
            .doc(propriedade)
            .collection('animais')
            .doc(val.uid)
            .set(val, { merge: true })
                return true;
        }catch(error){
            console.log("AnimaisProvider, saveAnimais:" + error);
            return false;
        }
    };

    const deleteAnimais = async (val) => {
       try{
        await firestore()
            .collection('propriedades')
            .doc(propriedade)
            .collection('animais')
            .doc(val.uid)
            .delete();
            showToast('Animal excluído com sucesso!');
            return true;
        }catch(error){
            console.log("AnimaisProvider, deleteAnimais:" + error);
            return false;
       }
    };

    useEffect(() => {
        getAnimais();
    }, [animais]);

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