import React, { createContext, useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore'
import messaging from '@react-native-firebase/messaging'


export const MessagingContext = createContext({});

export const MessagingProvider = ({ children }) => {

    const [nav, setNav] = useState("");

    useEffect(() => {
        if(auth().currentUser){
            firestore()
                 .collection('users')
                 .doc(auth().currentUser.uid)
                 .get()
                 .then(documentSnapshot => {
                     if (documentSnapshot.data().perfil === "peão") {
                         messaging().subscribeToTopic('peao');
                         messaging().unsubscribeFromTopic('proprietario');
                     }
                     else if (documentSnapshot.data().perfil === "proprietário") {
                         messaging().subscribeToTopic('proprietario');
                         messaging().unsubscribeFromTopic('peao');
                     }
                 });
         }
    }, [auth().currentUser]);



    async function saveTokenToDatabase(token) {
        const userId = auth().currentUser.uid;

        await firestore()
            .collection('users')
            .doc(userId)
            .update({
                tokens: firestore.FieldValue.arrayUnion(token),
            });
    }

    useEffect(() => {
        // Get the device token
        messaging()
            .getToken()
            .then(token => {
                return saveTokenToDatabase(token);
            });
        console.log("Token renovado!")
    });

    useEffect(() => {
        messaging()
            .getInitialNotification()
            .then(async (remoteMessage) => {
                if (remoteMessage) {
                    setNav(remoteMessage.data.route);
                }
            });
    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('Message handled in the background!', remoteMessage)
        if(remoteMessage)
            setNav(remoteMessage.data.route);
    });

    function onMessage(navigation){
        messaging().onMessage(async remoteMessage => {
            console.log(
                'Notification recebida com o app aberto (activity na tela): ',
                remoteMessage,
            );
            if (remoteMessage) {
                switch (remoteMessage.data.route) {
                    case 'proprietario':
                        Alert.alert('admin', 'Tópico: ' + remoteMessage.data.route, [
                            { text: 'ir', onPress: () => { navigation.navigate("Animais")}},
                            { text: 'não', onPress: () => { } },
                        ]);
                        break;
                    case 'peao':
                        Alert.alert('user', 'Tópico: ' + remoteMessage.data.route, [
                            { text: 'ir', onPress: () => { navigation.navigate("Atividades") } },
                            { text: 'não', onPress: () => { } },
                        ]);
                        break;
                }
            }
        });
    }

    return (
        <MessagingContext.Provider
            value={{
                nav,
                onMessage
            }}
        >
            {children}
        </MessagingContext.Provider>
    );
}