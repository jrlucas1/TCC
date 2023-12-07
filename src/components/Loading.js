import React from 'react';
import {ActivityIndicator} from 'react-native';
import styled from 'styled-components/native';

export const LoadingArea = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  align-items: center;
  justify-content: center;
  background-color: #C5D8A4;
`;

export default () => {
  return (
    <LoadingArea>
      <ActivityIndicator size="large" color={"#206A5D"} />
    </LoadingArea>
  );
};
