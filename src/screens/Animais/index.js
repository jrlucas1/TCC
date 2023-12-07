import React, { useEffect, useState, useContext } from 'react';
import { CommonActions } from '@react-navigation/native';
import { AnimaisContext } from '../../context/AnimaisProvider';
import Item from './Item';
import { Container, FlatList, TextInput } from './styles';
import AddFloatButton from '../../components/AddFloatButton';
import { Picker } from '@react-native-picker/picker';
import {filters} from './filters';


const Animais = ({ navigation }) => {
    const [data, setData] = useState([]);
    const { animais } = useContext(AnimaisContext);
    const [animaisTemp, setAnimaisTemp] = useState([]);
    const [search, setSearch] = useState('');
    const [filtro, setFiltro] = useState('filterByName');

    useEffect(() => {
        setData(animais);
    }, [animais]);

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
                params: { animal: null },
            }),
        );
    };

    const renderItem = ({ item }) => (
        <Item item={item} onPress={() => routeCourse(item)} />
    );

    const applyFilter = (filterName, data, value) => {
        if (filters[filterName]) {
          setAnimaisTemp(filters[filterName](data, value));
        }
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
      <Picker style={{ height: 50, width: 150}}
        selectedValue={filtro}
        onValueChange={itemValue => {
          setFiltro(itemValue);
          applyFilter(itemValue, data, search);
        }}
      >
        <Picker.Item key={0} label="Nome" value="filterByName" />
        <Picker.Item key={1} label="Sexo" value="filterBySexo" />
        <Picker.Item key={2} label="Peso" value="filterByWeight" />
      </Picker>
            <FlatList
                data={animaisTemp && animaisTemp.length > 0 ? animaisTemp : data}
                renderItem={renderItem}
                keyExtractor={(item) => item.uid}
            />
            <AddFloatButton onClick={routeAddAnimal} />
        </Container>
    );
};
export default Animais;