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

      const getAnimais = () => {
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
                },
                (e) => {
                    console.error('AnimaisProvider, getAnimais: ' + e);
                },
            );
    }

    const saveAnimais = async (val) => {        
        try{
        await firestore()
            .collection('propriedades')
            .doc(propriedade)
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
                return true;
        }catch(error){
            console.log("AnimaisProvider, saveAnimais:" + error);
            return false;
        }
    };

    const deleteAnimais = async (val) => {
        firestore()
            .collection('propriedades')
            .doc(propriedade)
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