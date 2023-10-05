import React, { createContext, useContext, useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth';
import { AuthContext } from './AuthProvider';

export const ChartContext = createContext({});

export const ChartProvider = ({ children }) => {

    const { propriedade } = useContext(AuthContext);
    const [dataPie, setDataPie] = useState([]);
    const [dataBar, setDataBar] = useState();
    const [averageWeight, setAverageWeight] = useState();
    const [averageAge, setAverageAge] = useState();


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
                                prenha++;
                                break;
                            case doc.data().situacao = "Vazia":
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
                },
                (e) => {
                    console.error('ChartProviders, getAnimalsState: ' + e);
                },
            );
        }

    const getTotalExpenses = () => {
        firestore()
        .collection("propriedades")
        .doc(propriedade)
        .collection("atividades")
        .orderBy("valor")
        .onSnapshot(
            snapShot => {
                snapShot.forEach((doc) => {
                    console.log(doc.data().valor)
                })
            },
        )
    }

    const getAverageWeight = () => {
        firestore()
        .collection("propriedades")
        .doc(propriedade)
        .collection("animais")
        .orderBy("nome")
        .onSnapshot(snapShot => {
            let soma = 0;
            let animais = 0;
            snapShot.forEach((doc) => {
                soma = parseFloat(soma) + parseFloat(doc.data().peso);
                animais++;
                console.log("The average weight is: " + soma/animais)
            })
            setAverageWeight(soma/animais);
        })
    }

    const getAverageAge = () => {
        firestore()
        .collection("propriedades")
        .doc(propriedade)
        .collection("animais")
        .orderBy("nome")
        .onSnapshot(snapShot => {
            let soma = 0;
            let animais = 0;
            snapShot.forEach((doc) => {
                soma = parseFloat(soma) + parseFloat(doc.data().idade);
                animais++;
                console.log("The average age is: " + soma/animais)
            })
            setAverageAge(soma/animais);
        })
    }

    const getAnimalsPerGender = () => {
        firestore()
        .collection("propriedades")
        .doc(propriedade)
        .collection("animais")
        .orderBy("nome")
        .onSnapshot(snapShot => {
            let data = {};
            let macho = 0;
            let femea = 0;
            snapShot.forEach((doc) => {
                switch (doc.data().sexo){
                    case doc.data().sexo = "M":
                        macho++;
                        break;
                    case doc.data().sexo = "F":
                        femea++;
                        break;
                    default:
                        break;
                }
            })
           
            setDataBar({
                labels: ["Macho", "Fêmea"],
                datasets: [
                    {
                        data: [macho, femea]
                    }
                ]
            })
            
            console.log("Macho: " + macho + " Femea: " + femea)
            
        }, (e) => {
            console.log(e);
        }
    );
}


    
    useEffect(() => {
    
        getAnimalsState();
        getTotalExpenses();
        getAverageWeight();
        getAverageAge();
        getAnimalsPerGender();

    }, [propriedade])

    return (
        <ChartContext.Provider
            value={{
                dataPie,
                dataBar,
                averageWeight,
                averageAge
            }}>
            {children}
        </ChartContext.Provider>
    );
}