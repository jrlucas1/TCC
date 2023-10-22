import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const Text = styled.Text`
  font-size: 24px;
  color: #206A5D;
  margin-bottom: 10px;
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
  border: 1px solid #206A5D;
`;

export const Div = styled.View`
  flex-direction: column;
  background-color: #C5D8A4;
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
  justify-content: center;
  align-items: center;
`;