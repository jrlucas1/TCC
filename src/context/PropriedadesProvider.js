import React, { createContext } from 'react';

export const PropiedadeContext = createContext({});

export const PropiedadeProvider = ({ children }) => {
    return (
        <PropiedadeContext.Provider value={{}}>
            {children}
        </PropiedadeContext.Provider>
    );
};