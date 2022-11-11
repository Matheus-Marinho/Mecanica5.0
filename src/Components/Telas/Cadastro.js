import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { TextInput, Text, View, Button, StyleSheet, SafeAreaView, Alert } from 'react-native'
import auth from '@react-native-firebase/auth';

import Header from './Header'

export default Cadastro = () => {

    const navigation = useNavigation();

    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const Cadastrar = () => {
        if(email === '' || senha === '' || displayName === ''){
            Alert.alert("Campos Vazios!");
        }else{

            setIsLoading(true);
            auth().createUserWithEmailAndPassword(email, senha)
            .then(()=>{
                Alert.alert('Criado com Sucesso!');
            })
            .catch(error => console.error(error))
            .finally(()=> setIsLoading(false))
        }
    }

    return (
        <SafeAreaView style={estilos.container} >
            <Header/>
            <View style={estilos.form}>
                <Text style={estilos.label}>Nome: </Text>
                <TextInput
                style={estilos.inputext}
                placeholder='Nome'
                onChangeText={(n)=>setDisplayName(n)}
                />
            </View>
            
            <View style={estilos.form}>
                <Text style={estilos.label}>E-mail: </Text>
                <TextInput
                style={estilos.inputext}
                placeholder='E-mail'
                onChangeText={(e)=>setEmail(e)}
                />
            </View>

            <View style={estilos.form} >
                <Text style={estilos.label} >Senha: </Text>
                <TextInput
                style={estilos.inputext}
                placeholder='Senha'
                onChangeText={(s)=>setSenha(s)}
                secureTextEntry={true}
                maxLength={15}
                />
            </View>

            <View style={estilos.botao}>
                <Button
                title="Cadastrar"
                color="#39414C"
                onPress={Cadastrar}
                />
            </View>

            <Text>Já tem conta? <Text
            style={estilos.logintext}
            onPress={()=> navigation.reset({routes: [{name: 'Login'}]})}
            >Faça Login</Text></Text>

        </SafeAreaView>
    )
}

const estilos = StyleSheet.create({
    container: {
        marginTop: 100,
        alignContent: 'center',
        alignItems: 'center',
    },

    apresentacao: {
        display: 'flex',
        flexDirection: 'row',
        margin: 10,
    },

    label: {
        fontSize: 16,
        color: "#FFFF",
        margin: 5,
        fontWeight: 'bold',
      },

    logintext: {
        fontWeight: 'bold',
        textAlign: 'center',
        textDecorationLine: 'underline',
        margin: 10
    },

    botao: {
        margin: 15,
        padding: 35,
    },
    
    form: {
        display: 'flex',
        backgroundColor: "#39414C",
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },

    inputext: {
        backgroundColor: '#ffff',
        width: '70%',
        margin: 5,
        padding: 5,
        borderRadius: 10
    }
})