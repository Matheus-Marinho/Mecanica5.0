import React, { useEffect, useState } from "react";
import { Text, View, Button, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SelectList from "react-native-dropdown-select-list";
import firestore, { firebase } from '@react-native-firebase/firestore';


import Calendario from '../Calendario'

export default Diversos = () => {   

    const navigation = useNavigation();
    const [servDiversos, setServDiversos] = useState([]);
    const listaServicos = servDiversos.map((s)=>({
        label: s.id,
        value: s.descricao,
    }));
    const [selecionado, setSelecionado] = useState('');
    const [dataAgenda, setDataAgenda] = useState('');
    const agendamento = {servico: '', data: '', cliente: '',};

    const Agendar = () => {
        let cont = 0;
        agendamento.servico = selecionado;
        agendamento.data = dataAgenda;
        agendamento.cliente = firebase.auth().currentUser.email;
        return firestore()
        .collection('Agendamentos')
        .onSnapshot((querySnapshot)=>{
            querySnapshot.docs.forEach((doc)=>{
                if(doc.id === agendamento.servico + agendamento.data + agendamento.cliente){
                    cont += 1;
                }
            });

            if(cont != 0){
                Alert.alert('Agendamento, Já existente');
                console.log('Agendamento, Já existente');
            } else {
                Alert.alert('Agendamento realizado com sucesso!');
                console.log('Agendamento realizado com sucesso!')
                firestore().collection('Agendamentos')
                .doc(agendamento.servico + agendamento.data + agendamento.cliente)
                .set(agendamento)
            }
        });
    };

    useEffect(()=>{
        carregarServiços = () => {
            firestore()
            .collection('servicosDiversos')
            .onSnapshot((querySnapshot)=>{
                const servicos = [];
                querySnapshot.docs.forEach((doc)=>{
                    const {id, descricao} = doc.data();
                    servicos.push({
                        id: doc.data().id,
                        descricao: doc.data().descricao,
                    });
                });
                setServDiversos(servicos);
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

            {Calendario(dataAgenda, setDataAgenda)}

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
        width: 180,
    },

})