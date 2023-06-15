import React, { createContext, useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore'
import { CommonActions } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging'

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
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


    const signIn = async (email, pass) => {
        try {
            await auth().signInWithEmailAndPassword(email, pass)
            if (!auth().currentUser.emailVerified) {
                Alert.alert("Verifique sua conta antes de entrar no site");
                auth.signOut();
                return false;
            } else {

                setUser(auth().currentUser);
                return true;
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Erro', 'Erro ao entrar: ' + error.message);
            return false;
        }
    }

    const signUp = async (user, pass) => {
        try {
            await auth().createUserWithEmailAndPassword(user.email, pass)
            let userBeingCreated = auth().currentUser;
            await firestore()
                .collection('users')
                .doc(userBeingCreated.uid)
                .set(user)
            await userBeingCreated.sendEmailVerification()
            Alert.alert('Aviso', 'Um email foi enviado para' + user.email + ' para fazer a verificação.');
            return true;
        } catch (error) {
            Alert.alert('Erro: ', error)
            return false;
        }
    }

    const signOut = async () => {
        auth().signOut();
        removeUserSession();
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'AuthStack' }],
            }),
        );
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

    return (
        <AuthContext.Provider
            value={{
                signUp,
                signIn,
                signOut,
                user,
                resetPassword,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
