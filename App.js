import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from './src/screens/SignIn';
import Home from './src/screens/Home';
import Preload from './src/screens/Preload';
import SignUp from './src/screens/SignUp';
<<<<<<< HEAD
import Animais from './src/screens/Animais'
import ResetPassWord from './src/screens/ResetPassWord';
import { AuthProvider } from './src/context/AuthProvider';
import { AnimaisProvider } from './src/context/AnimaisProvider';

=======
import Cursos from './src/screens/Cursos/styles';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
>>>>>>> 069b065aebb480c38b0d03f7e934e55b231fc405

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

<<<<<<< HEAD
const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="Preload" screenOptions={{headerShown: false}}>
      <Stack.Screen component={Preload} name="Preload" />
      <Stack.Screen component={SignIn} name="SignIn" />
      <Stack.Screen component={SignUp} name="SignUp" />
      <Stack.Screen component={ResetPassWord} name="ResetPassWord" />
    </Stack.Navigator>
  );
};

const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
      <Stack.Screen component={Home} name="Home" />
      <Stack.Screen component={Animais} name="Animais" />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AnimaisProvider>
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="AuthStack"
        screenOptions={{headerShown: false}}>
        <Stack.Screen component={AuthStack} name="AuthStack" />
        <Stack.Screen component={AppStack} name="AppStack" />
      </Stack.Navigator>
    </NavigationContainer>
    </AnimaisProvider>
    </AuthProvider>
  );
};

=======
const AuthStack = () => (
  <Stack.Navigator
    initialRouteName="Preload"
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen component={Preload} name="Preload" />
    <Stack.Screen component={SignIn} name="SignIn" />
    <Stack.Screen component={SignUp} name="SignUp" />
  </Stack.Navigator>
);

const AppStack = () => (
  <Tab.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerShown: false,
    }}>
    <Tab.Screen component={Home} name="Home" />
    <Tab.Screen component={Cursos} name="Cursos" />
  </Tab.Navigator>
);

const App = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="AuthStack"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen component={AuthStack} name="AuthStack" />
      <Stack.Screen component={AppStack} name="AppStack" />
    </Stack.Navigator>
  </NavigationContainer>
);
>>>>>>> 069b065aebb480c38b0d03f7e934e55b231fc405
export default App;
