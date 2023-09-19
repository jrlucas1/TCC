import React, { createContext, useContext, useEffect, useState } from 'react';
import { create } from 'apisauce';
import auth from '@react-native-firebase/auth';
import { AuthContext } from './AuthProvider';

export const ChartContext = createContext({});

export const ChartProvider = ({ children }) => {


    return (
        <ChartContext.Provider
            value={{
            }}>
            {children}
        </ChartContext.Provider>
    );
}