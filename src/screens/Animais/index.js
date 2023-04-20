import React, { useEffect, useState, useContext } from 'react';
import { CommonActions } from '@react-navigation/native';
import { AnimaisContext } from '../../context/AnimaisProvider';
import Item from './Item';
import { Container, FlatList, TextInput } from './styles';
import AddFloatButton from '../../components/AddFloatButton';


const Animais = ({ navigation }) => {
    const [data, setData] = useState([]);
    const { animais } = useContext(AnimaisContext);
    const [animaisTemp, setAnimaisTemp] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        setData(animais);
    }, [animais]);

    const filterByName = value => {

        if (value !== '') {
            let a = [];
            animais.filter(animal => {
                if (animal.nome[0].toLowerCase().includes(value.toLowerCase())){
                    a.push(animal);
                }
            })
            if (a.length > 0) {
                console.log(animaisTemp)
                setAnimaisTemp(a);
            }
        } else {
            setAnimaisTemp([]);
        }
    }
    const routeCourse = (item) => {
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
            <TextInput placeholder="search"
                onChangeText={filterByName} />
            <FlatList
                data={animaisTemp.length > 0 ? animaisTemp : data}
                renderItem={renderItem}
                keyExtractor={(item) => item.uid}
            />
            <AddFloatButton onClick={routeAddAnimal} />
        </Container>
    );
};
export default Animais;