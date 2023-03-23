import React from 'react';
import {ActivityIndicator} from 'react-native';
import styled from 'styled-components/native';

<<<<<<< HEAD
=======
import {COLORS} from '../assets/colors';

>>>>>>> 069b065aebb480c38b0d03f7e934e55b231fc405
export const LoadingArea = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export default () => {
  return (
    <LoadingArea>
      <ActivityIndicator size="large" color={COLORS.primaryDark} />
    </LoadingArea>
  );
};
