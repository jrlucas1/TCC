import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SignIn from '../screens/SignIn'
import Home from '../screens/Home';
import Preload from '../screens/Preload';
import SignUp from '../screens/SignUp';
import Animal from '../screens/Animal';
import Animais from '../screens/Animais';
import ResetPassWord from '../screens/ResetPassWord';
import Icon from 'react-native-vector-icons/Ionicons'
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator initialRouteName="Preload" screenOptions={{ headerShown: false }}>
            <Stack.Screen component={Preload} name="Preload" />
            <Stack.Screen component={SignIn} name="SignIn" />
            <Stack.Screen component={SignUp} name="SignUp" />
            <Stack.Screen component={ResetPassWord} name="ResetPassWord" />
        </Stack.Navigator>
    );
};

const AppStack = () => {
    return (
        <Tab.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <Tab.Screen component={Home} name="Home" options={{
                tabBarIcon: () => <Icon name="home-sharp" color="#000"/>
            }} />
            
            <Tab.Screen component={Animais} name="Animais" />
        </Tab.Navigator >
    );
};

const Navigator = () => {
    return (
                <NavigationContainer>
                    <Stack.Navigator
                        initialRouteName="AuthStack"
                        screenOptions={{ headerShown: false }}>
                        <Stack.Screen component={AuthStack} name="AuthStack" />
                        <Stack.Screen component={AppStack} name="AppStack" />
                        <Stack.Screen component={Animal} name="Animal" />
                    </Stack.Navigator>
                </NavigationContainer>
    );
};

export default Navigator;
