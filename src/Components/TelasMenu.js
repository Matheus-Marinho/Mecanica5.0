import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Menu from './Telas/Menu';
import Moto from './Servicos/Moto';
import Carros from './Servicos/Carros';
import Bicicleta from './Servicos/Bicicleta';
import Diversos from "./Servicos/Diversos";
import meusAgendamentos from "./meusAgendamentos";
import Comentarios from "./Comentarios";
import Mapa from "./Telas/Mapa";

const Stack = createStackNavigator();

export default () => {
    return (
        <Stack.Navigator
        intialRouteName="Menu"
        screenOptions={{
            headerTitleAlign: 'center',
            headerStyle: {
                backgroundColor: '#39414C'
            },
            headerTintColor: '#FFFF',
            headerTitleStyle: {
                fontWeight: 'bold'
            }
        }}
        >
            <Stack.Screen name="Menu" component={Menu}/>
            <Stack.Screen name="Moto" component={Moto}/>
            <Stack.Screen name="Carros" component={Carros}/>
            <Stack.Screen name="Bicicleta" component={Bicicleta}/>
            <Stack.Screen name="Diversos" component={Diversos}/>
            <Stack.Screen name="Meus Agendamentos" component={meusAgendamentos}/>
            <Stack.Screen name="Comentários" component={Comentarios}/>
            <Stack.Screen name="Mapa" component={Mapa}/>
        </Stack.Navigator>
    )
}