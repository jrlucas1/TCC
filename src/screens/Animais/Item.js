import React from 'react';
import { Button, Div, TextMenor } from './styles';

const Item = ({ item, onPress }) => {
    return (
        <Button onPress={onPress} underlayColor="transparent">
            <>
                
                <Div>
                    <TextMenor>{item.nome}</TextMenor>
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