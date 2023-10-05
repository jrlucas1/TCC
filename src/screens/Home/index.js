import React, {useEffect, useState, useContext} from 'react';
import {View, Alert} from 'react-native';
import MyButtom from '../../components/MyButtom';
import {Text, Div} from './styles';
import auth from '@react-native-firebase/auth';
import app from '@react-native-firebase/app';
import { CommonActions } from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage'
import {BarChart, PieChart} from 'react-native-chart-kit'
import { useWindowDimensions } from "react-native";
import { ChartContext } from '../../context/ChartProvider';


const Home = ({navigation}) => {

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
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage:1,
    useShadowColorFromDataset: false // optional
  };
 
  const screenWidth = useWindowDimensions().width;

  async function removeUserSession() {
    try {
        await EncryptedStorage.removeItem("user_session");
    } catch (error) {
    }
}

  const signOut = () => {
    auth().signOut();
    removeUserSession();
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'AuthStack'}],
      }),
    );
  };
  return (
    <View>
      <Div>
        <BarChart
        data=
          {dataBar === undefined ? dataA : dataBar}
        width={screenWidth - 50}
        height={220}
        yAxisLabel="$"
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
      <MyButtom text="SignOut" onClick={signOut} />
    </View>
  );
};
export default Home;
