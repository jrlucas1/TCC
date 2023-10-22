import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Text = styled.Text`
  font-size: ${width * 0.04}px;
  margin-left: ${width * 0.02}px;
  color: #000;
`;

export const Div = styled.View`
  background-color: #c5d8a4;
  border-radius: ${width * 0.02}px;
  padding: ${width * 0.01}px;
  align-self: center;
  margin-top: ${width * 0.05}px;
`;
