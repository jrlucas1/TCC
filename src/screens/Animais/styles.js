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
    height: 120px;
    padding: 20px;
    margin-top: 10px;
    border-radius: 10px;
`;
export const Text = styled.Text`
    font-size: 32px;
`;
export const TextMenor = styled.Text`
    font-size: 16px;

`
export const Div = styled.View`
    width: 100%;
    height: 50px;
    flex-direction: column;
`;

export const TextInput = styled.TextInput`
  width: 80%;
  margin: 10px auto;
  padding: 10px;
  border: 1px solid;
  margin-bottom: 10px;
  border-radius: 25px;
`;
