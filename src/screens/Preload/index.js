import { React, useContext, useEffect, useState } from 'react';
import { Text } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { AuthContext } from '../../context/AuthProvider';
import Loading from '../../components/Loading';


const Preload = ({ navigation }) => {

  const {retrieveUserSession} = useContext(AuthContext);
  const {signIn} = useContext(AuthContext);
  const {getUserRole} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  
  const entrar = async () => {
    const userSession = await retrieveUserSession();
    if (userSession) {
      try {
        if(await signIn(userSession.email, userSession.pass)){
          setLoading(true);
          var role = await getUserRole();
          if(role){
            switch(role){
              case 'peao':
                navigation.navigate('PeaoAppStack'); 
                setLoading(false);
                break;
              case 'proprietario':
                navigation.navigate('ProprietarioAppStack');
                setLoading(false);
                break;
          }    
        }
      }
    } catch (e) {
        console.error('Preload, entrar: ' + e);
      }
    } else {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'SignIn' }],
        }),
      );
    }
  };

  useEffect(() => {
    entrar()
  }, [])

  return (
    <>
    {loading ? <Loading/>: <Text></Text>}
    </>
  );

}
export default Preload;
