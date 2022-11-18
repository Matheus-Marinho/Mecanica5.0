import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { TextInput, Text, View, Button, StyleSheet, SafeAreaView, Alert } from 'react-native'
import auth, { firebase } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import Header from './Header'

GoogleSignin.configure({
    webClientId: '812783377620-vhuru09h9ii3tgsvnefd3hfvg4ml844n.apps.googleusercontent.com',
});

export default Login = () => {

    const responseGoogle = (response) => {
        console.log(response);
    }

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();

    LogarGoogle = async() => {
        await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
        const {idToken} = await GoogleSignin.signIn();
        const credenciaisGoogle = auth.GoogleAuthProvider.credential(idToken);
        return auth().signInWithCredential(credenciaisGoogle);
    }

    const Logar = () => {
        if(email === '' || senha === ''){
            Alert.alert("Campos vazios!", "Favor preencher todas as informações!");
        }else{
            setIsLoading(true);
            auth()
                .signInWithEmailAndPassword(email, senha)
                .then(()=>{
                    Alert.alert("Logado");
                })
                .catch(error=>console.error(error))
        }
    }

    const EsqueciSenha =() => {
        if (email === ''){
            Alert.alert("Campos vazio!", "Favor, informar o seu e-mail")
        } else {
            auth()
            .sendPasswordResetEmail(email)
            .then(()=>{
                Alert.alert("Enviamos um link para seu e-mail!")
            })
            .catch(error=>console.error(error))
        }
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

            <View style={estilos.botaoGoogle}>
                <Button
                color='#dd4b39'
                title={"Logar com a conta Google"}
                onPress={()=>this.LogarGoogle()}
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
    },

    botaoGoogle: {
        height: 55,
        margin: 5,
    }
})