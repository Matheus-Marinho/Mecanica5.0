import React, { useEffect, useState } from "react";
import { View, ScrollView, ActivityIndicator, StyleSheet, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import firestore from '@react-native-firebase/firestore';
import auth, { firebase } from '@react-native-firebase/auth';

const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
);

export default MeusAgendamentos = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [agendamentos, setAgendamentos] = useState([]);
    const agend = [];

    const renderItem = ({item}) => (
        <Item title={'Servico: ' + item.servico + ' - Data: ' + item.data + 'id: ' + item.id}/>
    );

    const carregarAgendamento = () => {
        firestore()
        .collection('Agendamentos')
        .onSnapshot((querySnapshot)=>{
            querySnapshot.docs.forEach((doc)=>{
                if(doc.data().cliente == firebase.auth().currentUser.email) {
                    agend.push({
                        id: doc.id,
                        data: doc.data().data,
                        servico: doc.data().servico,
                    });
                    setAgendamentos(agend);
                }
            });
        });
    };

    useEffect(()=>{
        carregarAgendamento();
        setIsLoading(false);
    }, []);

    return (
        <ScrollView>
            {agendamentos.length > 0 ? (
                isLoading ? <ActivityIndicator size={'large'} color={'gray'}/>
                : <FlatList
                    data={agendamentos}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                />) : <Text style={styles.message}> Ainda não existem agendamentos para você!</Text>
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    item: {
      backgroundColor: '#39414C',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      color: '#fff',
    },
    message: {
        textAlign: "center",
        fontSize: 25,
        margin: 20,
        fontWeight: "bold"
    }
  });