import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex: 1;
    align-items: center;
    justify-content: center;
`;
export const FlatList = styled.FlatList`
    width: 95%;
    height: 100%;
`;
export const Button = styled.TouchableHighlight`
width: 100%;
height: 140px;
padding: 20px;
`;
export const TextMenor = styled.Text`
    font-size: 16px;
    margin-left: 10px;
    color: #000;
`;

export const Div = styled.View`
    flex-direction: column;
    backgroundColor: #C5D8A4
    border-radius: 10px;
    padding: 5px;

`;

export const TextInput = styled.TextInput`
  width: 80%;
  margin: 10px auto;
  padding: 10px;
  border: 1px solid;
  margin-bottom: 10px;
  border-radius: 25px;
`;
