import React, { useEffect, useState } from "react";
import { Text, View, Button, StyleSheet, Alert, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SelectList from "react-native-dropdown-select-list";
import firestore, { firebase } from '@react-native-firebase/firestore';


import Calendario from '../Calendario'

export default Moto = () => {

    const navigation = useNavigation();
    const [servMoto, setServMoto] = useState([]);
    const listaServicos = servMoto.map((s)=>({
        label: s.id,
        value: s.descricao,
    }));
    const [selecionado, setSelecionado] = useState('');
    const [dataAgenda, setDataAgenda] = useState('');
    const agendamento = {servico: '', data: '', cliente: '', comentario: ''};
    const [coment, setComent] = useState('');

    const Agendar = () => {
        let cont = 0;
        agendamento.servico = selecionado;
        agendamento.data = dataAgenda;
        agendamento.cliente = firebase.auth().currentUser.email
        agendamento.comentario = coment
        firestore()
        .collection('Agendamentos')
        .onSnapshot((querySnapshot)=>{
            querySnapshot.docs.forEach((doc)=>{
                if(agendamento.cliente === doc.data().cliente && agendamento.data === doc.data().data && agendamento.descricao === undefined){
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
            }
        });
        if(agendamento.comentario !== ''){
            firestore()
                .collection('Comentarios')
                .doc()
                .set({
                    cliente: firebase.auth().currentUser.displayName,
                    comentario: agendamento.comentario,
                    data:Date().toLocaleString('pt', { timeZone: 'America/Fortaleza' })
                })
        }
    };

    useEffect(()=>{
        carregarServiços = () => {
            firestore()
            .collection('servicosMoto')
            .onSnapshot((querySnapshot)=>{
                const servicos = [];
                querySnapshot.docs.forEach((doc)=>{
                    const {id, descricao} = doc.data();
                    servicos.push({
                        id: doc.data().id,
                        descricao: doc.data().descricao,
                    });
                });
                setServMoto(servicos);
            });
        };
        carregarServiços();
    }, []);

    return (
        <View style={estilos.container}>
            <View>
                <Text style={estilos.label}>Serviços: </Text>
                <SelectList
                placeholder="Escolha um Serviço"
                setSelected={setSelecionado}
                data={listaServicos}
                boxStyles={{borderRadius: 5, width: '100%', margin: 5}}
                />
                <Text style={estilos.label}>Data: </Text>
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
                    navigation.navigate('Menu');
                }}
                />
            </View>
        </View>
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