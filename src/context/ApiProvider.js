import React, { createContext, useContext, useEffect, useState } from 'react';
import { create } from 'apisauce';
import auth from '@react-native-firebase/auth';
import { AuthContext } from './AuthProvider';

export const ApiContext = createContext({});

export const ApiProvider = ({ children }) => {
    const [api, setApi] = useState(null);
    const {propriedade} = useContext(AuthContext);
    
    const getApi = async () => {
        if (auth().currentUser) {
            auth()
                .currentUser.getIdToken(true)
                .then(idToken => {
                    if (idToken) {
                        const apiLocal = create({
                            baseURL:
                                `https://firestore.googleapis.com/v1/projects/farmanage1/databases/(default)/documents/propriedades/${propriedade}/`,
                            headers: { Authorization: 'Bearer ' + idToken },
                        });

                        apiLocal.addResponseTransform(response => {
                            if (!response.ok) {
                                throw response;
                            }
                        });
                        setApi(apiLocal);
                        return apiLocal;
                    }
                })
                .catch(e => {
                    console.error('ApiProvider, getApi: ' + e);
                });
        }
    };

    useEffect(() => {
        getApi();
    }, [auth().currentUser]);

    return (
        <ApiContext.Provider
            value={{
                api,
                getApi
            }}>
            {children}
        </ApiContext.Provider>
    );
}