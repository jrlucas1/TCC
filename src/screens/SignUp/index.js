import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import FuncionarioTab from './FuncionarioTab';
import AddFuncionarios from './AddFuncionario';

const Tab = createBottomTabNavigator();

const SignUp = () => {

  return (
    <View style={styles.container}>
      <Tab.Navigator
            screenOptions={{
              initialRouteName: 'PropriedadesTab',
              headerShown: false,
              labelStyle: {
                height: 18,
                fontSize: 12,
                margin: 0,
                fontWeight: 'bold',
              },
              showIcon: true,
            }}
      >
        <Tab.Screen name="Funcionários" component={FuncionarioTab} />
        <Tab.Screen name="Adicionar funcionarios" component={AddFuncionarios} />
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