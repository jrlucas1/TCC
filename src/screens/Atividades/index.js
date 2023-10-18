import React, { useEffect, useState, useContext } from 'react';
import { CommonActions } from '@react-navigation/native';
import { AtividadeContext } from '../../context/AtividadesProvider';
import Item from './Item';
import { Container, FlatList, TextInput } from './styles';
import AddFloatButton from '../../components/AddFloatButton';


const Atividades = ({ navigation }) => {
    const [data, setData] = useState([]);
    const { atividades } = useContext(AtividadeContext);
    const [atividadesTemp, setAtividadesTemp] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        setData(atividades);
    }, [atividades]);

    const filterByName = value => {

        if (value !== '') {
            let a = [];
            atividades.filter(atividade => {
                if (atividade.desc[0].toLowerCase().includes(value.toLowerCase())){
                    a.push(atividade);
                }
            })
            if (a.length > 0) {
                console.log(atividadesTemp)
                setAtividadesTemp(a);
            }
        } else {
            setAtividadesTemp([]);
        }
    }
    const routeCourse = (item) => {
        navigation.dispatch(
            CommonActions.navigate({
                name: 'Atividade',
                params: { atividade: item },
            }),
        );
    };

    const routeAddAtividade = () => {
        navigation.dispatch(
            CommonActions.navigate({
                name: 'Atividade',
                params: { atividade: null },
            }),
        );
    };

    const renderItem = ({ item }) => (
        <Item item={item} onPress={() => routeCourse(item)} />
    );

    return (
        <Container>
            <TextInput placeholder="Search"
                onChangeText={filterByName} />
            <FlatList
                data={atividadesTemp.length > 0 ? atividadesTemp : data}
                renderItem={renderItem}
                keyExtractor={(item) => item.uid}
            />
            <AddFloatButton onClick={routeAddAtividade} />
        </Container>
    );
};
export default Atividades;