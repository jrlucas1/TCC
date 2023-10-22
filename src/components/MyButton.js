import React from 'react';
import {Text, TouchableHighlight, StyleSheet} from 'react-native';

const MyButton = ({text, onClick}) => {
  return (
    <TouchableHighlight style={styles.button} onPress={onClick}>
      <Text style={styles.text}>{text}</Text>
    </TouchableHighlight>
  );
};
export default MyButton;

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: '#FFF',
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: '#206A5D',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
});
