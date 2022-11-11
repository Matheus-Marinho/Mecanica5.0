import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Button, View, StyleSheet, Alert } from 'react-native';
import { Card } from 'react-native-elements';
import auth from '@react-native-firebase/auth'

import Header from "./Header";

export default Menu = () => {

    const navigation = useNavigation();

    const Sair = () => {
        auth().signOut();
        Alert.alert('Saindo');
    }

    return (
        <View style={estilos.container}>
            <Header/>
            <View style={estilos.cards}>
                <Card>
                    <Card.Title>Carros</Card.Title>
                    <Card.Divider/>
                    <Card.Image
                    style={estilos.imagem}
                    source={require('../Imagens/carros.png')}
                    onPress={()=>navigation.navigate('Carros')}
                    />
                </Card>

                <Card>
                    <Card.Title>Moto</Card.Title>
                    <Card.Divider/>
                    <Card.Image
                    style={estilos.imagem}
                    source={require('../Imagens/moto.png')}
                    onPress={()=>navigation.navigate('Moto')}
                    />
                </Card>
            </View>

            <View style={estilos.cards}>
                <Card>
                    <Card.Title>Bicicletas</Card.Title>
                    <Card.Divider/>
                    <Card.Image
                    style={estilos.imagem}
                    source={require('../Imagens/bicicleta.png')}
                    onPress={()=>navigation.navigate('Bicicleta')}
                    />
                </Card>

                <Card>
                    <Card.Title>Diversos</Card.Title>
                    <Card.Divider/>
                    <Card.Image
                    style={estilos.imagem}
                    source={require('../Imagens/geral.png')}
                    onPress={()=>navigation.navigate('Diversos')}
                    />
                </Card>
            </View>

            <View style={estilos.botao}>
                <Button
                title="Meus agendamentos"
                color='#39414C'
                onPress={()=>navigation.navigate('Meus Agendamentos')}
                />
            </View>

            <View style={estilos.botao}>
                <Button
                title="Sair"
                color='#39414C'
                onPress={Sair}
                />
            </View>
        </View>
    )
}

const estilos = StyleSheet.create ({
    container: {
        //flex: 1,
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#FFFF'
    },

    imagem: {
        margin: 10,
        width: 80,
        height: 80,
    },

    cards: {
        display: 'flex',
        justifyContent: "center",
        width: 200,
        height: 200,
        marginBottom: 15,
        flexDirection: 'row',
    },

    botao: {
        //flex: 1,
        margin: 15,
        justifyContent: "space-between",
        fontWeight: "bold"
    }
})