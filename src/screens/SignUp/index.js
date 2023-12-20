import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import FuncionarioTab from './FuncionarioTab';
import AddFuncionarios from './AddFuncionario';

const Tab = createBottomTabNavigator();

const SignUp = () => {
  const screenOptions = useCallback(({ route }) => ({
    headerShown: false,
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;
      switch (route.name) {
        case 'Funcionários':
          iconName = 'people';
          break;
        case 'Adicionar funcionarios':
          iconName = 'add-circle';
          break;
        default:
          iconName = 'person';
          break;
      }
      return <Ionicons name={iconName} size={size} color={color} />;
    },
  }), []);

  return (
    <View style={styles.container}>
      <Tab.Navigator screenOptions={screenOptions}
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