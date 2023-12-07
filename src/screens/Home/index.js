import React, {useState, useContext} from 'react';
import MyButton from '../../components/MyButton';
import {Text, Div, Container} from './styles';
import { CommonActions } from '@react-navigation/native';
import {BarChart, PieChart} from 'react-native-chart-kit'
import { useWindowDimensions } from "react-native";
import { ChartContext } from '../../context/ChartProvider';
import { AuthContext } from '../../context/AuthProvider';

const Home = ({navigation}) => {
  
  const screenWidth = useWindowDimensions().width;
  const {removeUserSession} = useContext(AuthContext);
  const {dataPie, dataBar, averageAge, averageWeight} = useContext(ChartContext);
  const [dataA, setDataA] = useState({
      labels: ["Macho", "Femea"],
      datasets: [
        {
          data: [0, 0]
        }
      ]
    });
 
  const chartConfig = {
    backgroundGradientFromOpacity: 0.1,
    backgroundGradientTo: "#FFF",
    backgroundGradientToOpacity: 0.1,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 3, // optional, default 3
    barPercentage:1,
    useShadowColorFromDataset: false, // optional,
    formatYLabel: (value) => {
      return Math.round(value); // Round the value to the nearest integer
    },
  };
 
  const signOut = async () => {
   await removeUserSession();
   navigation.dispatch(
    CommonActions.reset({
      index: 1,
      routes: [
        { name: 'AuthStack' }
      ],
    })
   );
  }

  return (
    <Container>
      <Div>
        <BarChart
        data=
          {dataBar === undefined ? dataA : dataBar}
        width={screenWidth - 50}
        height={220}
        chartConfig={chartConfig}
        verticalLabelRotation={30}
        fromZero={true}
        />
      </Div>

      <Div>
        <PieChart
        data={dataPie}
        width={screenWidth - 50}
        height={230}
        chartConfig={chartConfig}
        accessor={"population"}
        backgroundColor={"transparent"}
        center={[5, 10]}
        />
      </Div>
      <Div>
        <Text> O peso medio do rebanho foi de {averageWeight} kg  </Text>
        <Text> A idade media do rebanho é de {averageAge} meses </Text>
      </Div>
      <MyButton text="SignOut" onClick={signOut} />
    </Container>
  );
};
export default Home;
