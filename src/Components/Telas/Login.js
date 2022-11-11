import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { TextInput, Text, View, Button, StyleSheet, SafeAreaView, Alert } from 'react-native'
import auth, { firebase } from '@react-native-firebase/auth';

import Header from './Header'

export default Login = () => {

    const responseGoogle = (response) => {
        console.log(response);
    }

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();

    const Logar = () => {
        setIsLoading(true);
        auth()
            .signInWithEmailAndPassword(email, senha)
            .then(()=>{
                Alert.alert("Logado");
            })
            .catch(error=>console.error(error))
    }

    const EsqueciSenha =() => {
        auth()
        .sendPasswordResetEmail(email)
        .then(()=>{
            if (email === ''){
                Alert.alert("Digite seu E-mail")
            } else {
                Alert.alert("Enviamos um Link para seu E-mail!")
            }
        } )
        .catch(error=>console.error(error))
    }

    return (
        <SafeAreaView style={estilos.container} >
            <Header/>
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
                maxLength={15}
                secureTextEntry={true}
                />
            </View>

            <View style={estilos.botao}>
                <Button
                title="Entrar"
                color="#39414C"
                onPress={Logar}
                />
            </View>

            <Text>Não tem conta? <Text
            style={estilos.logintext}
            onPress={() => navigation.reset({routes: [{name: 'Cadastro'}]})}
            >Clique aqui</Text></Text>

            <Text
            style={estilos.logintext}
            onPress={EsqueciSenha}
            >Esqueci minha senha</Text>

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