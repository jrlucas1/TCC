import React from 'react';
import { Button, Text, Div, TextMenor } from './styles';

const Item = ({ item, onPress }) => {
    return (
        <Button onPress={onPress} underlayColor="transparent">
            <>
                <Text>{item.nome}</Text>
                <Div>
                    <TextMenor>{item.idade} meses</TextMenor>
                    <TextMenor>{item.sexo}</TextMenor>
                    <TextMenor>{item.peso} Kg </TextMenor>
                    <TextMenor>{item.situacao} </TextMenor>
                </Div>
            </>
        </Button>
    );
};
export default Item;