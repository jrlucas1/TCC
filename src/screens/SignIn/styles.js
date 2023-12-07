import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const View = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #C5D8A4;
`;

export const Text = styled.Text`
  font-size: 16px;
  color: #206A5D;
  text-decoration-line: underline;
`;

export const TextInput = styled.TextInput`
  width: 80%;
  height: 50px;
  background-color: #FFF;
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
  font-size: 16px;
  color: #206A5D;
`;

export const TextLogin = styled.Text`
  color: #000;
  font-size: ${width * 0.08}px;
  margin-top: ${height * 0.1}px;
  text-align: center;
`;