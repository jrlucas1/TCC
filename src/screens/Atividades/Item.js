import React from 'react';
import { Button, Text, Div, TextMenor } from './styles';

const Item = ({ item, onPress }) => {
    return (
        <Button onPress={onPress} underlayColor="transparent">
            <>
                <Text>{item.desc}</Text>
                <Div>
                <TextMenor>{item.desc} </TextMenor>
                <TextMenor>R$ {item.valor}</TextMenor>
                <TextMenor>{item.dataSolicitacao}  </TextMenor>
                <TextMenor>{item.dataFim} </TextMenor>
                <TextMenor>{item.status} </TextMenor>
                </Div>
            </>
        </Button>
    );
};
export default Item;