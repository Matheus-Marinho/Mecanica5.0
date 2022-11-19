import React, { useEffect, useState } from "react";
import { Text, View, Button, StyleSheet, Alert, ScrollView, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SelectList from "react-native-dropdown-select-list";
import firestore, { firebase } from '@react-native-firebase/firestore';

import Calendario from '../Calendario'

export default Bicicleta = () => {

    var moment = require('moment');
    const navigation = useNavigation();
    const [servBike, setServBike] = useState([]);
    const listaServicos = servBike.map((s)=>({label: s.id, value: s.descricao,}));
    const [selecionado, setSelecionado] = useState('');
    const [dataAgenda, setDataAgenda] = useState('');
    const agendamento = {servico: '', data: '', cliente: ''};
    const comentario = {cliente: '', comentario: '',};
    const [coment, setComent] = useState('');

    const Agendar = () => {
        let cont = 0;
        agendamento.servico = selecionado;
        agendamento.data = moment(dataAgenda, 'YYYY-MM-DD').format('DD/MM/YYYY')
        agendamento.cliente = firebase.auth().currentUser.displayName;
        firestore()
        .collection('Agendamentos')
        .onSnapshot((querySnapshot)=>{
            querySnapshot.docs.forEach((doc)=>{
                if(agendamento.cliente === doc.data().cliente && agendamento.data === doc.data().data && agendamento.servico === doc.data().servico){
                    cont += 1;
                    console.log(cont);
                }
            });

            if(cont != 0){
                
            }else{
                Alert.alert('Agendamento realizado com sucesso!');
                console.log('Agendamento realizado com sucesso!');
                firestore()
                .collection('Agendamentos')
                .doc() // tem q deixar vazio pra ficar aleatorio
                .set(agendamento)
                sendEmail()
            }
        });
    };

    const enviarComentario = () => {
        
        comentario.comentario = coment

        if(comentario.comentario !== ''){
            firestore()
                .collection('Comentarios')
                .doc()
                .set({
                    cliente: firebase.auth().currentUser.displayName,
                    comentario: comentario.comentario,
                    data: moment().format('DD/MM/YYYY')
                })
                Alert.alert("Comentáeio enviado!");
        }else {
            Alert.alert("Digite seu comentário!");
        }
    }

    function sendEmail(){
        body = {
            "assunto": "Notificação de Agendamento",
            "destinatarios": firebase.auth().currentUser.email,
            "corpo": `Olá, ${firebase.auth().currentUser.displayName},
    
Segue abaixo confirmação de agendamento:
Serviço: ${agendamento.servico} - Data: ${agendamento.data}

            Atenciosmanente,
            Mecânica do Bill`,
            "corpoHtml": ""
        }
        // a preferencia do que tá sendo enviado é o CorpoHTML
        let request = new XMLHttpRequest()
        request.open("POST", "https://us-central1-mecanica-5aa47.cloudfunctions.net/enviarEmail", true)
        request.setRequestHeader("Content-type", "application/json")
        request.send(JSON.stringify(body))
    
        request.onload = function() {
            console.log(this.responseText)
        }
    
        console.log(request.responseText)
    }

    useEffect(()=>{
        carregarServiços = () => {
            firestore()
            .collection('servicosBike')
            .onSnapshot((querySnapshot)=>{
                const servicos = [];
                querySnapshot.docs.forEach((doc)=>{
                    const {id, descricao} = doc.data();
                    servicos.push({
                        id: doc.data().id,
                        descricao: doc.data().descricao,
                    });
                });
                setServBike(servicos);
            });
        };
        carregarServiços();
    }, []);

    return (
        <ScrollView contentContainerStyle={estilos.container}>
            <View>
                <Text style={estilos.label}>Serviços: </Text>
                <SelectList
                    placeholder="Escolha um Serviço"
                    setSelected={setSelecionado}
                    data={listaServicos}
                    boxStyles={{borderRadius: 5, width: '100%', margin: 5}}
                />
            </View>
            <View>
                <Text style={estilos.label}>Data: </Text>
                {Calendario(dataAgenda, setDataAgenda)}
            </View>

            <View>
                <Text style={estilos.label}>Comentário/Observação: </Text>
                <TextInput
                    style={estilos.comentarios}
                    onChangeText={value => setComent(value)}
                    value={coment}
                    placeholder={"Digite aqui seu comentário"}
                />
            </View>

            <View>
                <Button
                    style={estilos.botao}
                    title="Agendar"
                    color='#39414C'
                    onPress={()=>{
                        Agendar();
                        enviarComentario();
                        navigation.navigate('Menu');
                    }}
                />
            </View>
        </ScrollView>
    )
}

const estilos = StyleSheet.create({
    container: {
        display: 'flex',
        //alignItems: 'center',
        padding: 35,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
    },

    label: {
        fontSize: 16,
        color: '#39414C',
        margin: 5,
        marginTop: 20,
        fontWeight: 'bold',
    },

    comentarios: {
        borderWidth: 1,
        margin: 10,
        marginBottom: 30,
        padding: 10,
        borderColor: "#000",
        borderRadius: 10
    },

    botao: {
        margin: 30,
    },

})