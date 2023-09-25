import React from 'react';
import { AnimaisProvider } from '../context/AnimaisProvider';
import { AuthProvider } from '../context/AuthProvider';
import { AtividadeProvider } from '../context/AtividadesProvider';
import { PropriedadesProvider } from '../context/PropriedadesProvider';
import Navigator from './Navigator';
import { ApiProvider } from '../context/ApiProvider';
import { MessagingProvider } from '../context/MessagingProvider';
import { ChartProvider } from '../context/ChartProvider';
export default function Providers() {
    return (
        <AuthProvider>
                <ApiProvider>
                    <AnimaisProvider>
                        <AtividadeProvider>
                            <PropriedadesProvider>
                                <MessagingProvider>
                                    <ChartProvider>
                                        <Navigator />
                                    </ChartProvider>
                                </MessagingProvider>
                            </PropriedadesProvider>
                        </AtividadeProvider>
                    </AnimaisProvider>
                </ApiProvider>
        </AuthProvider>
    )
}