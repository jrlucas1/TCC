import React, { useEffect, useState, useContext } from 'react';
import { CommonActions } from '@react-navigation/native';
import { AnimaisContext } from '../../context/AnimaisProvider';
import Item from './Item';
import {Container, FlatList} from './styles';


const Animais = ({ navigation }) => {
    const [data, setData] = useState([]);
    const {animais} = useContext(AnimaisContext);
    useEffect(() => {
        setData(animais); 
    }, [animais]);

    const routeCourse = (item) => {
        console.log(item)
        navigation.dispatch(
            CommonActions.navigate({
                name: 'Animal',
                params: { animal: item },
            }),
        );
    };

    const routeAddAnimal = () => {
        console.log("Olá")
        navigation.dispatch(
            CommonActions.navigate({
                name: 'Animal',
                params: { Animal: null },
            }),
        );
    };

    const renderItem = ({ item }) => (
        <Item item={item} onPress={() => routeCourse(item)} />
    );

    return (
        <Container>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.uid}
            />
        </Container>
    );
};
export default Animais;