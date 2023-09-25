import React, { createContext, useContext, useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth';
import { AuthContext } from './AuthProvider';

export const ChartContext = createContext({});

export const ChartProvider = ({ children }) => {

    const { propriedade } = useContext(AuthContext);
    const [dataPie, setDataPie] = useState([])

    const getAnimalsState = () => {
        firestore()
            .collection("propriedades")
            .doc(propriedade)
            .collection("animais")
            .orderBy("nome")
            .onSnapshot(
                snapShot => {
                    let data = [];
                    let prenha = 0;
                    let vazia = 0;
                    snapShot.forEach((doc) => {
                        switch (doc.data().situacao) {
                            case doc.data().situacao = "Prenha":
                                console.log("prenha")
                                prenha++;
                                break;
                            case doc.data().situacao = "Vazia":
                                console.log("Vazia")
                                vazia++;
                                break;
                            default:
                                break;
                        }
                    });
                    data.push({
                        name: "Prenha",
                        population: prenha,
                        color: "#3f9",
                        legendFontColor: "#7F7F7F",
                        legendFontSize: 15

                    },
                        {
                            name: "Vazia",
                            population: vazia,
                            color: "#0ff",
                            legendFontColor: "#7F7F7F",
                            legendFontSize: 15
                        }
                    )
                    setDataPie(data);
                    console.log(data);
                },
                (e) => {
                    console.error('AnimaisProvider, getAnimais: ' + e);
                },
            );
        }

    const getTotalExpenses = () => {
        firestore()
        .collection("propriedades")
        .doc(propriedade)
        .collection("atividades")
        .orderBy("descricao")
        .onSnapshot(
            snapShot => {
                snapShot.forEach((doc) => {
                    console.log(doc.data().valor)
                })
            },
        )
    }

    useEffect(() => {
        getAnimalsState();
    }, [propriedade])

    return (
        <ChartContext.Provider
            value={{
                dataPie,
            }}>
            {children}
        </ChartContext.Provider>
    );
}