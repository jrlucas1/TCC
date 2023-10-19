import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const Container = styled.SafeAreaView`
    flex: 1;
    align-items: center;
    justify-content: center;
`;
export const FlatList = styled.FlatList`
    width: ${width*0.95}px
`;
export const Button = styled.TouchableHighlight`
    width: ${width*0.95}px;
    height: ${width*0.35}px;
    padding: ${width * 0.03}px;
`;
export const TextMenor = styled.Text`
    font-size: ${width * 0.04}px;
    margin-left: ${width * 0.02}px;
    color: #000;
`
export const Div = styled.View`
    flex-direction: column;
    backgroundColor: #C5D8A4;
    border-radius: ${width * 0.02}px;
    padding: ${width * 0.01}px;
    align-itens: justify;
`;

export const TextInput = styled.TextInput`
  width: ${width * 0.8}px;
  margin: ${width * 0.05}px auto;
  padding: ${width * 0.02}px;
  border: 1px solid;
  margin-bottom: ${width * 0.05}px;
  border-radius: ${width * 0.05}px;
  text-align: center;
  font-size: ${width * 0.04}px;
`;