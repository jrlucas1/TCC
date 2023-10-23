import React from 'react';
import { Button, Div, TextMenor } from './styles';

const Item = ({ item }) => {
    return (
            <>
                <Div>
                    <TextMenor>{item.email}</TextMenor>
                </Div>
            </>
    );
};
export default Item;