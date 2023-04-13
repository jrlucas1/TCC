import React from 'react';
import { AnimaisProvider } from '../context/AnimaisProvider';
import { AuthProvider } from '../context/AuthProvider';
import Navigator from './Navigator';

export default function Providers() {
    return (
        <AuthProvider>
            <AnimaisProvider>
                <Navigator />
            </AnimaisProvider>
        </AuthProvider>
    )
}