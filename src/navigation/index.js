import React from 'react';
import { AnimaisProvider } from '../context/AnimaisProvider';
import { AuthProvider } from '../context/AuthProvider';
import { AtividadeProvider } from '../context/AtividadesProvider';
import Navigator from './Navigator';
import { ApiProvider } from '../context/ApiProvider';

export default function Providers() {
    return (
        <AuthProvider>
            <ApiProvider>
                <AnimaisProvider>
                    <AtividadeProvider>
                        <PropiedadesProvider>
                            <Navigator />
                        </PropiedadesProvider>
                    </AtividadeProvider>
                </AnimaisProvider>
            </ApiProvider>
        </AuthProvider>
    )
}