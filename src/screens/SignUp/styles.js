import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
`;


export const Div = styled.View`
  flex-direction: column;
  background-color: #C5D8A4;
  padding: 10px;
  margin: 25px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`;

export const Text = styled.Text`
  font-size: 18px;
  color: #206A5D;
  text-align: center;
  margin-bottom: 10px;
`;

export const TextLogin = styled.Text`
  font-size: 30px;
  margin-top: 100px;
  color: #000;
  text-align: center;
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
export const FlatList = styled.FlatList`
    width: ${width*0.95}px
`;