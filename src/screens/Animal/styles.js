import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const Text = styled.Text`
  font-size: 48px;
`;
export const TextInput = styled.TextInput`
  width: ${width * 0.8}px;
  margin: 10px auto;
  padding: 10px;
  border: 1px solid;
  margin-bottom: 10px;
  border-radius: 25px;
  color: #000;
  background-color: #fff;
  text-align: center;
`;


export const Div = styled.View`
flex-direction: column;
backgroundColor: #C5D8A4;
border-radius: 10px;
padding: 10px;
margin: 10px;
justify-content: center;
align-itens: center;
`;