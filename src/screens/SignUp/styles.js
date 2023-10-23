import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const FlatList = styled.FlatList`
    width: ${width*0.95}px
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

export const Text = styled.Text`
font-size: ${width * 0.04}px;
margin-left: ${width * 0.02}px;
color: #000;
`;


export const TextInput = styled.TextInput`
  width: 80%;
  height: 50px;
  margin: 10px auto;
  padding: 10px;
  border-radius: 25px;
  background-color: #FFF;
  border: 1px solid #206A5D;
  text-align: center;
  color: #206A5D;
`;
