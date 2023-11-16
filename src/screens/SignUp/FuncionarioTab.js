import React, { useState, useEffect, useContext } from 'react';
import { CommonActions } from '@react-navigation/native';

import { Container, FlatList } from './styles';
import Item from './Item';
import AddFloatButton from '../../components/AddFloatButton';
import { AuthContext } from '../../context/AuthProvider';

const FuncionarioTab = ({ navigation }) => {
    const [data, setData] = useState([]);
    const { funcionarios } = useContext(AuthContext);

    useEffect(() => {
        setData(funcionarios);
    }, [funcionarios]);

    console.log(data)

    const renderItem = ({ item }) => (
        <Item item={item}/>
    );

    return (
        <Container>
            <FlatList
                data={data}
                keyExtractor={(item) => item.uid}
                renderItem={renderItem}
            />
        </Container>
    );
};
export default FuncionarioTab;