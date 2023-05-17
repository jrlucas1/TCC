import React from 'react';
import { Button, Text, Div, TextMenor } from './styles';

const Item = ({ item, onPress }) => {
    return (
        <Button onPress={onPress} underlayColor="transparent">
            <>
                <Text>{item.nome}</Text>
                <Div>
                    <TextMenor>{item.nome}</TextMenor>
                    <TextMenor>{item.descricao}</TextMenor>
                </Div>
            </>
        </Button>
    );
};
export default Item;