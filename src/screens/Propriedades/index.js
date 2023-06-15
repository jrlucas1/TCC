/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import PropriedadesTab from './PropriedadesTab';
import MapPropriedadesTab from './MapPropriedadesTab';
import {COLORS} from '../../assets/colors';

const Tab = createBottomTabNavigator();

const Propriedades = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        initialRouteName: 'PropriedadesTab',
        activeTintColor: COLORS.primary,
        labelStyle: {
          height: 18,
          fontSize: 12,
          margin: 0,
          fontWeight: 'bold',
        },
        style: {backgroundColor: COLORS.white},
        showIcon: true,
      }}>
      <Tab.Screen
        name="Lista de Propriedades"
        component={PropriedadesTab}
        options={{
          tabBarLabel: 'Propriedades',
          tabBarIcon: () => (
            <Icon name="navigate-circle" color={COLORS.primary} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="MapPropriedadesTab"
        component={MapPropriedadesTab}
        options={{
          tabBarLabel: 'Localização',
          tabBarIcon: () => (
            <Icon name="map" color={COLORS.primary} size={20} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default Propriedades;