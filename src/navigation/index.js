import React from 'react';
import { AnimaisProvider } from '../context/AnimaisProvider';
import { AuthProvider } from '../context/AuthProvider';
import { AtividadeProvider } from '../context/AtividadesProvider';
import { PropriedadesProvider } from '../context/PropriedadesProvider';
import Navigator from './Navigator';
import { MessagingProvider } from '../context/MessagingProvider';
import { ChartProvider } from '../context/ChartProvider';
export default function Providers() {
    return (
        <AuthProvider>
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
        </AuthProvider>
    )
}