import React, { useState, useEffect, useContext } from 'react';
import { CommonActions } from '@react-navigation/native';

import { Container, FlatList } from './styles';
import Item from './Item';
import AddFloatButton from '../../components/AddFloatButton';
import { PropriedadesContext } from '../../context/PropriedadesProvider';

const PropriedadesTab = ({ navigation }) => {
    const [data, setData] = useState([]);
    const { propriedades } = useContext(PropriedadesContext);

    useEffect(() => {
        setData(propriedades);
    
    }, [propriedades]);

    const routePropriedade = (item) => {
        //console.log(item);
        navigation.dispatch(
            CommonActions.navigate({
                name: 'Propriedade',
                params: { propriedade: item },
            }),
        );
    };

    const routeAddPropriedade = () => {
        navigation.dispatch(
            CommonActions.navigate({
                name: 'Propriedade',
                params: { propriedade: null },
            }),
        );
    };

    const renderItem = ({ item }) => (
        <Item item={item} onPress={() => routePropriedade(item)} />
    );

    return (
        <Container>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.uid}
            />
            <AddFloatButton onClick={routeAddPropriedade} />
        </Container>
    );
};
export default PropriedadesTab;