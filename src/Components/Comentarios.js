import React, { useEffect, useState } from "react";
import { View, SafeAreaView, ActivityIndicator, StyleSheet, Text, FlatList } from "react-native";
import firestore from '@react-native-firebase/firestore';
import auth, { firebase } from '@react-native-firebase/auth';


export default Comentarios = () => {
    
    const [isLoading, setIsLoading] = useState(true);
    const [comentarios, setComentarios] = useState([]);
    const coment = [];

    const Item = ({ title, comentario }) => (
        <SafeAreaView style={estilos.item}>
          <Text style={estilos.title}>{title}</Text>
          <Text style={estilos.comentario}>"{comentario}"</Text>
        </SafeAreaView>
    );

    const renderItem = ({item}) => (
        <Item title={'Cliente: ' + item.cliente + ' - Data: ' + item.data} comentario={item.comentario}/>
    );

    const carregarComentarios = () => {
        firestore()
        .collection('Comentarios')
        .onSnapshot((querySnapshot)=>{
            querySnapshot.docs.forEach((doc)=>{
                coment.push({
                    id: doc.id,
                    cliente: doc.data().cliente,
                    data: doc.data().data,
                    comentario: doc.data().comentario,
                });
                setComentarios(coment);
            });
        });
    };

    useEffect(()=>{
        carregarComentarios();
        setIsLoading(false);
    }, []);

    return (
        <SafeAreaView>
            {comentarios.length > 0 ? (
                isLoading ? <ActivityIndicator size={'large'} color={'gray'}/>
                : <FlatList
                    data={comentarios}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                />) : <Text style={estilos.message}> Ainda não existem comentários!</Text>
            }
        </SafeAreaView>
    )
}

const estilos = StyleSheet.create({
    item: {
      backgroundColor: '#39414C',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
        color: '#fff',
        fontWeight: "bold",
    },
    message: {
        textAlign: "center",
        fontSize: 25,
        margin: 20,
        fontWeight: "bold"
    },
    comentario: {
        color: '#fff',
        fontStyle:"italic",
    }
  });