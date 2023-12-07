import React, { useEffect, useState, useContext } from 'react';
import { CommonActions } from '@react-navigation/native';
import { AtividadeContext } from '../../context/AtividadesProvider';
import Item from './Item';
import { Container, FlatList, TextInput } from './styles';
import AddFloatButton from '../../components/AddFloatButton';
import { Picker } from '@react-native-picker/picker';
import {filters} from './filters';

const Atividades = ({ navigation }) => {
    const [data, setData] = useState([]);
    const { atividades } = useContext(AtividadeContext);
    const [atividadesTemp, setAtividadesTemp] = useState([]);
    const [filtro, setFiltro] = useState('filterByDesc');
    const [search, setSearch] = useState("");

    useEffect(() => {
        setData(atividades);
    }, [atividades]);

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

    const applyFilter = (filterName, data, value) => {
        if (filters[filterName])
          setAtividadesTemp(filters[filterName](data, value));
        return data;
    };

    return (
        <Container>
            <TextInput
                placeholder="Search"
                onChangeText={text => {
                setSearch(text);
                applyFilter(filtro, data, text);
                }}
            />
                  <Picker style={{ height: 50, width: 150 }}
                    selectedValue={filtro}
                    onValueChange={itemValue => {
                    setFiltro(itemValue);
                    }}
                    >
                <Picker.Item label="Descricao" value="filterByDesc" />
                <Picker.Item label="Data" value="filterByDate" />
            </Picker>
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