import React from 'react';
import { Text, Div } from './styles';

const Item = ({ item }) => {
    return (
            <>
                <Div>
                    <Text>{item.email}</Text>
                    <Text>{item.role}</Text>
                </Div>
            </>
    );
};
export default Item;