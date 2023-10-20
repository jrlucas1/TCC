import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const Div = styled.View`
  align-items: center;
  background-color: #c5d8a4;
  border-radius: 10px;
  flex-direction: column;
  margin: ${height * 0.03}px;
  padding: ${width * 0.03}px;
`;

export const Text = styled.Text`
  color: #206a5d;
  font-size: ${width * 0.05}px;
  text-align: center;
`;

export const TextInput = styled.TextInput`
  background-color: white;
  border: 1px solid;
  border-radius: ${width * 0.05}px;
  color: #206a5d;
  margin: ${height * 0.02}px auto;
  padding: ${width * 0.03}px;
  text-align: center;
  width: ${width * 0.8}px;
`;

export const TextLogin = styled.Text`
  color: #000;
  font-size: ${width * 0.08}px;
  margin-top: ${height * 0.1}px;
  text-align: center;
`;