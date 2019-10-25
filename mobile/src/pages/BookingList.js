import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Alert, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { AuthContext } from "../context/authProvider";
import { ListBookings } from "../services/firestore"

import { app } from "../services/firebase";



import logo from '../assets/logo.png';
import Entypo from 'react-native-vector-icons/Entypo';
import BookingItem from "../components/BookingItem";
import spinner from "../assets/spinner.gif"

const db = app.firestore();

export default function BookingList({ navigation }) {

    const [Bookings, setBookigs] = useState([]);
    const [loadFinished, setLoadFinished] = useState(false);
    const { currentUser } = useContext(AuthContext);

    async function getbookings() {
        const data = await ListBookings(currentUser.uid);
        setBookigs(data);
        setLoadFinished(true);
    }
    useEffect(() => {
        getbookings();

    }, []);

    useEffect(() => {

        const DbListening = db.collection("Booking").where("userId", "==", currentUser.uid)
            .onSnapshot(function (querySnapshot) {
                getbookings();
            });
        return () => {
            DbListening();
        }
    }, [currentUser]);

    function handeOpenMenu() {
        navigation.openDrawer();
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.buttonMenu} onPress={handeOpenMenu}>
                    <Entypo name="menu" size={35} style={{ color: "#444" }} />
                </TouchableOpacity>
                <Image style={styles.image} source={logo} />
            </View>

            <ScrollView style={styles.form}>
                {!loadFinished && <Image style={styles.spinner} source={spinner} />}
                {Bookings.length === 0 && loadFinished === true && <Text style={styles.message}>Nenhuma reserva por aqui... </Text>}

                {Bookings.map((book) => <BookingItem key={book._id} booking={book} />)}
            </ScrollView>
        </View>


    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
        backgroundColor: '#fff',
        marginBottom: 30,

    },
    spinner: {
        alignSelf: "center",
        textAlign: "center",
        height: 100,
        width: 100,
        marginTop: 30,
    },
    message: {
        alignSelf: "center",
        paddingHorizontal: 30,
        marginTop: 30,
        textAlign: "center"
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
    image: {
        height: 32,
        resizeMode: "contain",
        marginTop: 10,
        marginBottom: 10,
    },
    buttonLogout: {
        height: 25,
        backgroundColor: "#f05a5b",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 3,
        position: "absolute",
        top: 12,
        right: 10,


    },
    buttonBack: {
        height: 25,
        backgroundColor: "#f05a5b",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 3,
        position: "absolute",
        top: 12,
        left: 10,


    },
    buttonLogoutText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 14,
        marginHorizontal: 5,
    },
    form: {
        alignSelf: "stretch",
        paddingHorizontal: 10,

    },
    label: {
        fontWeight: "bold",
        color: "#444",
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        paddingHorizontal: 20,
        fontSize: 16,
        color: "#444",
        height: 44,
        marginBottom: 20,
        borderRadius: 2
    },
    button: {
        height: 42,
        backgroundColor: "#f05a5b",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 2,
    },
    butonDisabled: {
        height: 42,
        backgroundColor: "#8a3333",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 2,
    },
    spinner: {
        height: 50,
        width: 50
    },
    inputErr: {
        borderWidth: 1,
        borderColor: "#ff7878",
        paddingHorizontal: 20,
        fontSize: 16,
        color: "#444",
        height: 44,
        marginBottom: 20,
        borderRadius: 2
    },
    labelErr: {
        fontWeight: "bold",
        color: "#ff7878",
        marginBottom: 8,
        fontSize: 12,
    },
    textErr: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },

    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    }
});
