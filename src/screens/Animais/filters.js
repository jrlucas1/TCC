export const filters = { 
    filterBySexo : (data, value)  => {
    if (value !== '') {
      return data.filter(animal => 
        animal.sexo.toLowerCase().startsWith(value.toLowerCase())
      );
    } else {
      return [];
    }
  },

 filterByName : (data, value) => {
    if (value !== '') {
        return data.filter(animal => 
      animal.nome.toLowerCase().startsWith(value.toLowerCase())
    );

    } else {
      return [];
    }
},
filterByWeight : (data, value) => {
    if (value !== '') {
    return data.filter(animal =>
        animal.peso >= value
    );
  } else {
    return
  }
}
}