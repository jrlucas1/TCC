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
    color: '#206A5D',
  },
  button: {
    width: 95,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center', 
    alignSelf: 'center',
    backgroundColor: '#FFF',
    padding: 10,
    margin: 20,
    borderRadius: 30,
  },
});
