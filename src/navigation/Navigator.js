import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from '../context/AuthProvider';
import SignIn from '../screens/SignIn';
import Home from '../screens/Home';
import Preload from '../screens/Preload';
import SignUp from '../screens/SignUp';
import Animal from '../screens/Animal';
import Animais from '../screens/Animais';
import Atividade from '../screens/Atividade';
import Atividades from '../screens/Atividades';
import ResetPassWord from '../screens/ResetPassWord';
import Propriedade from '../screens/Propriedade';
import Propriedades from '../screens/Propriedades';

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

const ProprietarioAppStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'black',
        tabBarStyle: {
          backgroundColor: '#7B8C5D',
          height: 60,
          alignContent: 'center',
        },
      }}>
      <Tab.Screen
        component={Home}
        name="Home"
        options={{
          tabBarIcon: () => <Icon name="home-sharp" color="#FFF" size={30} />,
        }}
      />
      <Tab.Screen
        component={Animais}
        name="Animais"
        options={{
          tabBarIcon: () => (
            <Icon2 name="cow" color="#FFF" size={30} align="center" />
          ),
        }}
      />
      <Tab.Screen
        component={Atividades}
        name="Atividades"
        options={{
          tabBarIcon: () => (
            <Icon2 name="playlist-plus" color="#FFF" size={30} />
          ),
        }}
      />
      <Tab.Screen
        component={Propriedades}
        name="Propriedades"
        options={{
          tabBarIcon: () => (
            <Icon2 name="home-group" color="#FFF" size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const PeaoAppStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'black',
        tabBarStyle: {
          backgroundColor: '#7B8C5D',
          height: 60,
          alignContent: 'center',
        },
      }}>
      <Tab.Screen
        component={Home}
        name="Home"
        options={{
          tabBarIcon: () => <Icon name="home-sharp" color="#FFF" size={30} />,
        }}
      />
      <Tab.Screen
        component={Animais}
        name="Animais"
        options={{
          tabBarIcon: () => (
            <Icon2 name="cow" color="#FFF" size={30} align="center" />
          ),
        }}
      />
      <Tab.Screen
        component={Atividades}
        name="Atividades"
        options={{
          tabBarIcon: () => (
            <Icon2 name="playlist-plus" color="#FFF" size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const AppStack = () => {
  const { role } = useContext(AuthContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(true);
  }, []);

  if (!isAuthenticated) {
    return null;
  }

  if (role === 'proprietario') {
    return <ProprietarioAppStack />;
  }

  if (role === 'peao') {
    return <PeaoAppStack />;
  }

  return null;
};

const Navigator = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AuthStack" screenOptions={{ headerShown: false }}>
        <Stack.Screen component={AuthStack} name="AuthStack" />
        <Stack.Screen component={AppStack} name="AppStack" />
        <Stack.Screen component={Animal} name="Animal" />
        <Stack.Screen component={Atividade} name="Atividade" />
        <Stack.Screen component={Propriedade} name="Propriedade" />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;