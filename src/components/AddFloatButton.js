import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';

const Button = styled.TouchableOpacity`
  border-width: 0px;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  position: absolute;
  bottom: 10px;
  right: 10px;
  background-color: #0F0
  border-radius: 100px;
`;

const AddFloatButton = ({onClick}) => {
  return (
    <Button onPress={() => onClick()}>
      <Icon name="add" size={30} color="#000" />
    </Button>
  );
};
export default AddFloatButton;