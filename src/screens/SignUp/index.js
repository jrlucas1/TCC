import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import FuncionarioTab from './FuncionarioTab';
import AddFuncionarios from './AddFuncionario';

const Tab = createBottomTabNavigator();

const SignUp = () => {
  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Funcionários') {
              iconName = focused ? 'people' : 'people-outline';
            } else if (route.name === 'Adicionar funcionarios') {
              iconName = focused ? 'add-circle' : 'add-circle-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#206A5D',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Funcionários" component={FuncionarioTab} />
        <Tab.Screen
          name="Adicionar funcionarios"
          component={AddFuncionarios}
        />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default SignUp;