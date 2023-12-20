export const filters = {
  filterByDesc: (data, value) => {
    if (value !== '') {
      return data.filter(atividade =>
        atividade.desc.toLowerCase().startsWith(value.toLowerCase())
      );
    } else {
      return [];
    }
  },
  filterByDate: (data, value) => {
    console.log(data)
    if (value !== '') {
      return data.filter(atividade =>
        atividade.dataSolicitacao.toLowerCase().startsWith(value.toLowerCase())
      );
    } else {
      return [];
    }
  }
};