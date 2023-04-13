import React from 'react';
import styles from './styles'
import styled from 'styled-components/native';
const Item = ({ item, onPress }) => {

    return (
        <Button onPress={onPress} underlayColor="transparent">
            <>
                <Text>{item.nome}</Text>
                <Div>
                    <Text>{item.sexo}</Text>
                    <Text>{item.idade}</Text>
                    <Text>{item.peso}</Text>
                    <Text>{item.situacao}</Text>
                </Div>
            </>
        </Button>
    );
};
export default Item;