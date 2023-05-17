import React, { useState, useEffect, useContext } from 'react';
import { CommonActions } from '@react-navigation/native';

import { Container, FlatList } from './styles';
import Item from './Item';
import AddFloatButton from '../../components/AddFloatButton';
import { PropiedadesContext } from '../../context/PropiedadesProvider';

const PropriedadesTab = ({ navigation }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { propriedade } = useContext(PropiedadesContext);

    useEffect(() => {
        setData(propiedades); //pega os cursos que estão cacheados no FirebaseContext (Preload os carregou)
        setLoading(false);
    }, [propiedades]);

    const routePropriedade = (item) => {
        //console.log(item);
        navigation.dispatch(
            CommonActions.navigate({
                name: 'propriedade',
                params: { propiedade: item },
            }),
        );
    };

    const routeAddPropriedade = () => {
        navigation.dispatch(
            CommonActions.navigate({
                name: 'Propiedade',
                params: { propiedade: null },
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
            {loading && <Loading />}
        </Container>
    );
};
export default PropriedadesTab;