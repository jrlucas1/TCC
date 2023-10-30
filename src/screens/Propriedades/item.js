import React from 'react';
import { Button, Div, TextMenor } from './styles';

const Item = ({ item, onPress }) => {
    return (
        <Button onPress={onPress} underlayColor="transparent">
            <>
                <Div>
                    <TextMenor>{item.nome}</TextMenor>
                    <TextMenor>{item.descricao}</TextMenor>
                    <TextMenor>{item.latitude}</TextMenor>
                    <TextMenor>{item.longitude}</TextMenor>
                </Div>
            </>
        </Button>
    );
};
export default Item;