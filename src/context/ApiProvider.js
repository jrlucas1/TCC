import React, { createContext, useEffect, useState } from 'react';
import { create } from 'apisauce';
import auth from '@react-native-firebase/auth';

export const ApiContext = createContext({});

export const ApiProvider = ({ children }) => {
    const [api, setApi] = useState(null);
   
    const getApi = async () => {
        if (auth().currentUser) {
            auth()
                .currentUser.getIdToken(true)
                .then(idToken => {
                    if (idToken) {
                        const apiLocal = create({
                            baseURL:
                                'https://firestore.googleapis.com/v1/projects/farmanage-4c4c8/databases/(default)/documents/',
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
    }, []);

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