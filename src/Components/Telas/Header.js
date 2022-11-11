import React from "react";
import { Image, View, Text, StyleSheet } from "react-native";

const Header = () => {
    return (
        <View style={estilos.apresentacao} >
            <Image style={estilos.logo} source={require('../Imagens/logo.png')}/>
            <Text style={estilos.texto}>Mecânica do Bill</Text>
        </View>
    )
}

export default Header;

const estilos = StyleSheet.create({
logo: {
    width: 100,
    height: 100,
    marginTop: 60,
    textAlign: 'center',
    alignSelf: 'center',
},

texto: {
    fontSize: 20,
    color: "#39414C",
    textAlign: 'center',
    margin: 15,
    fontWeight: 'bold',
    fontStyle: 'italic',
},

apresentacao: {
    display: 'flex',
    //justifyContent: 'space-between',
    flexDirection: 'column',
    margin: 10,
}
});