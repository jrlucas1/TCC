import React, {memo} from 'react';
import { Button, Div, TextMenor } from './styles';

const Item = ({ item, onPress }) => {
    return (
        <Button onPress={onPress} underlayColor="transparent">
            <>
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
export default memo(Item);