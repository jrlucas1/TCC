import React, { createContext, useContext, useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth';
import { AuthContext } from './AuthProvider';

export const ChartContext = createContext({});

export const ChartProvider = ({ children }) => {

    const {propriedade} = useContext(AuthContext);

    const  getAnimalsState = () => {
        firestore()
            .collection("propriedades")
            .doc(propriedade)
            .collection("animais")
            .orderBy("nome")
            .onSnapshot(
                snapShot => {
                    let data = [];
                    snapShot.forEach((doc) => {
                        if(doc.data().situacao == "aaa")
                            console.log("Funcionou")
                    });
                },
                (e) => {
                    console.error('AnimaisProvider, getAnimais: ' + e);
                },
            );
    }
    
    getAnimalsState();

    return (
        <ChartContext.Provider
            value={{
            }}>
            {children}
        </ChartContext.Provider>
    );
}