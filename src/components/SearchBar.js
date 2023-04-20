import React from "react";
import { View, TextInput } from "react-native";

const SearchBar = (search) => {

    const searchFilterFunction = (text) =>{
        if(text){
            
        }
    }
    return(
    <View>
        <TextInput placeholder="Pesquisar"
                    value={search}
                    onChangeText={t => setSearch(t)}/>
    </View>
)
}
export default SearchBar;