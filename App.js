import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { ActivityIndicator, View } from 'react-native';

import TelasIniciais from './src/Components/TelasIniciais';
import TelasMenu from './src/Components/TelasMenu';

export default () => {

  const [inicializador, setInicializador] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(()=>{
    const subscriber = auth().onAuthStateChanged((user)=>{
      setUser(user);
      if (inicializador) {
        setInicializador(false);
      }
    });

    return subscriber;

  }, []);

  if (inicializador) {
    return (
      <View style={{flex:1, justifyContent: "center", alignItems: "center"}}>
        <ActivityIndicator size={'large'} color={'gray'}/>
      </View>
    )
  } 

  return (
    <NavigationContainer>
      {user ? <TelasMenu/> : <TelasIniciais/>}
    </NavigationContainer>
  );
};

