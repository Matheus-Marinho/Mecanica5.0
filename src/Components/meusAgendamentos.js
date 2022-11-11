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

    const [isLoading, setIsLoading] = useState(false)
    const [agendamentos, setAgendamentos] = useState(['']);
    const agend = [];

    const renderItem = ({item}) => (
        <Item title={'Servico: ' + item.servico + ' - Data: ' + item.data}/>
    );

    useEffect(()=>{
        setIsLoading(true) //matar essa linha
        carregarAgendamento = () => {
            firestore()
            .collection('Agendamentos')
            .onSnapshot((querySnapshot)=>{
                querySnapshot.docs.forEach((doc)=>{
                    if(doc.data().email == auth().currentUser.email) {
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
        carregarAgendamento();
    }, []);

    return (
        <View>
            {isLoading ? <ActivityIndicator size={'large'} color={'gray'}/>
            : <FlatList
            data={agendamentos}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            />}
        </View>
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
  });