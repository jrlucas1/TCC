import React, { useState } from 'react';
import { TextInput} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const SearchBar = () => {
  const [selectedValue, setSelectedValue] = useState("all");

  const filterByName = (text) => {
    // Your filter logic here
  };

  return (
    <>
      <TextInput placeholder="Search" onChangeText={filterByName} />
      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="All" value="all" />
        <Picker.Item label="Dog" value="dog" />
        <Picker.Item label="Cat" value="cat" />
        {/* Add more Picker.Item components for each animal type */}
      </Picker>
    </>
  );
};

export default SearchBar;