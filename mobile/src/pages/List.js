import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from "../context/authProvider"
import { SafeAreaView, Alert, ScrollView, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import Constants from 'expo-constants';

import SpotList from "../components/SpotList";
import logo from '../assets/logo.png'
import { app } from "../services/firebase";

import Entypo from 'react-native-vector-icons/Entypo';

const db = app.firestore();




export default function List({ navigation }) {

    const { currentUser } = useContext(AuthContext);
    const [techs, setTechs] = useState([]);

    useEffect(() => {

        const DbListening = db.collection("Booking").where("userId", "==", currentUser.uid)
            .onSnapshot(function (querySnapshot) {
                var requests = [];

                querySnapshot.forEach(function (doc) {


                    const obj = doc.data();

                    if (!obj.finished) {


                        switch (obj.status) {
                            case "pendding":
                                break;
                            case "acept":
                                Alert.alert("Aviso!", `Sua reserva em  ${obj.spotName} foi APROVADA`, [
                                    { text: 'OK', onPress: () => doc.ref.update({ finished: true }) },
                                ],
                                    { cancelable: false });
                                break;
                            case "reject":
                                Alert.alert("Aviso!", `Sua reserva em  ${obj.spotName} foi REJEITADA`, [
                                    { text: 'OK', onPress: () => doc.ref.update({ finished: true }) },
                                ],
                                    { cancelable: false });
                                break;
                            default:
                                break;
                        }
                    }
                });

            });
        return () => {
            DbListening();
        }
    }, [currentUser]);


    useEffect(() => {
        const techsArray = currentUser.techs.split(",").map(tech => tech.trim());
        setTechs(techsArray);
    }, []);

    function handeOpenMenu() {
        navigation.openDrawer();
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.buttonMenu} onPress={handeOpenMenu}>
                    <Entypo name="menu" size={35} style={{ color: "#444" }} />
                </TouchableOpacity>

                <Image style={styles.image} source={logo} />


            </View>
            <ScrollView>

                {techs.map(tech => <SpotList key={tech} tech={tech} />)}
            </ScrollView>


        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
        backgroundColor: '#fff',
        marginBottom: 30,

    },
    header: {
        flexDirection: "row",
        height: 50,
        alignItems: "center",
        backgroundColor: "#f2f2f2",
        justifyContent: "center",
        position: "relative"

    },
    buttonMenu: {
        height: 50,
        width: 50,
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        top: 0,
        left: 0,



    },
    buttonLogoutText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 14,
        marginHorizontal: 5,
    },
    image: {
        height: 32,
        resizeMode: "contain",
        marginTop: 10,
        marginBottom: 10,
    },
    buton: {
        height: 42,
        backgroundColor: "#f05a5b",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 2
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    }

});
