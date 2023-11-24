import React, { createContext, useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore'
import { CommonActions } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging'
import EncryptedStorage from 'react-native-encrypted-storage'

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState('');
    const [propriedade, setPropriedade] = useState('');
    const [funcionarios, setFuncionarios] = useState([]);
    const storeUserSession = async (email, pass) => {
        try {
            await EncryptedStorage.setItem(
                "user_session",
                JSON.stringify({
                    email,
                    pass,
                })
            );
        } catch (error) {
            console.log("Houve um erro ao salvar no cache")
        }
    }

    async function removeUserSession() {
        try {
            await auth()
            .signOut()
            .then(async () => {
                await EncryptedStorage.removeItem("user_session");
                setUser(null);
            })
        } catch (error) {
            console.error("Houve um erro ao remover do cache: " + error)
    }
}

    const getPropriedadesUser = async() => {
        try{
            let documento =  await firestore()
            .collection('users')
           .doc(auth().currentUser.uid)
           .get();
           
           setPropriedade(documento.data().propriedade);
        }
        catch(error){
            console.error("AuthProvider: " + error);
        }
    }

    const signIn = async (email, pass) => {
        try {
            await auth().signInWithEmailAndPassword(email, pass)
            if (!auth().currentUser.emailVerified) {
                Alert.alert("Verifique sua conta antes de entrar no site");
                auth.signOut();
                return false;
            } else {

                setUser(auth().currentUser);
                console.log(auth().currentUser)
               
                return true;
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Erro', 'Erro ao entrar: ' + error.message);
            return false;
        }
    }

    const signUp = async (user, pass, propriedade) => {
        try {
          await auth().createUserWithEmailAndPassword(user.email, pass);
          let userBeingCreated = auth().currentUser;
          await firestore()
            .collection('users')
            .doc(userBeingCreated.uid)
            .set({
              ...user,
              role: 'peao',
              propriedade: propriedade,
            });
          await userBeingCreated.sendEmailVerification();
          Alert.alert(
            'Aviso',
            'Um email foi enviado para' + user.email + ' para fazer a verificação.'
          );
          return true;
        } catch (error) {
          Alert.alert('Erro: ', error);
          return false;
        }
    };

    const resetPassword = async (email) => {
        auth()
            .sendPasswordResetEmail(email)
            .then(() => {
                Alert.alert('Aviso', 'Verifique sua caixa de e-mail.');
            })
            .catch(error => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
            });
    };
    
    const getUserRole = async () => {
        try {
            let documento = await firestore()
                .collection('users')
                .doc(auth().currentUser.uid)
                .get();
            setRole(documento.data().role);
        } catch (error) {
            console.error(error);
        }
    }

    const getFuncionarios = async () => {
        try {
            let funcionarios = await firestore()
                .collection('users')
                .where('role', '==', 'peao')
                .where('propriedade', '==', propriedade)
                .get();
                const funcionariosData = funcionarios.docs.map((doc) => {
                    const data = doc.data();
                    return {
                        uid: doc.id,
                      email: data.email,
                      role: data.role,
                    };
                  });
                 
                  setFuncionarios(funcionariosData);

                  
        } catch (error) {
            console.error(error);
        }
    }
        

    useEffect(() => {
    if(auth().currentUser){
      getPropriedadesUser();
      getUserRole();
      getFuncionarios();
    }
    }, [auth().currentUser]);


    return (
        <AuthContext.Provider
            value={{
                signUp,
                signIn,
                removeUserSession,
                user,
                resetPassword,
                propriedade, 
                role,
                funcionarios,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
