import React, { useEffect, useState } from "react"
import { withNavigation } from "react-navigation"
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";

import { ListSpots } from "../services/firestore";
import spinner from "../assets/spinner.gif"


import { app } from "../services/firebase";

const db = app.firestore();

function SpotList({ tech, navigation }) {
    const [spots, setSpots] = useState([]);
    const [loadFinished, setLoadFinished] = useState(false);

    async function loadSpots() {
        const response = await ListSpots(tech);
        setSpots(response);
        setLoadFinished(true);
    }
    useEffect(() => {
        loadSpots();
    }, []);

    useEffect(() => {

        async function getuserdata(uid) {
            const docRef = await Db.collection("Users")
                .doc(uid).get();
            return docRef.data();
        }

        const unsubscribe = db.collection("Spots")
            .onSnapshot((snapshot) => {

                loadSpots();


            });

        return (() => {
            unsubscribe();
        })
    }, []);

    function handleBooking(spot) {

        navigation.navigate("Booking", { spot })

    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}> Empresas que usam <Text style={styles.bold}>{tech}</Text> </Text>


            {!loadFinished && <Image style={styles.spinner} source={spinner} />}
            {spots.length === 0 && loadFinished === true && <Text style={styles.message}>Nenhum spot com essa categoria por enquanto :/ </Text>}

            <FlatList style={styles.list}
                data={spots}
                keyExtractor={spot => spot._id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={styles.listItem}>
                        <Image style={styles.thumbnail} source={{ uri: item.thumbnail }} />
                        <Text style={styles.company}>{item.company}</Text>
                        <Text style={styles.price}>{item.price === "" ? "GRÁTIS" : `R$${item.price}/dia `}</Text>
                        <TouchableOpacity style={styles.button} onPress={() => handleBooking(item)}>

                            <Text style={styles.buttonText}>SOLICITAR RESERVA</Text>

                        </TouchableOpacity>
                    </View>
                )}

            />


        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        marginTop: 20,

    },
    spinner: {
        alignSelf: "center",
        height: 60,
        width: 60,
    },
    message: {
        alignSelf: "center",
        paddingHorizontal: 30,
        textAlign: "center"
    },
    title: {
        fontSize: 20,
        color: "#444",
        paddingHorizontal: 20,
        marginBottom: 15,

    },
    bold: {
        fontWeight: "bold"
    },
    list: {
        paddingHorizontal: 20,
    },
    listItem: {
        marginRight: 15,

    },
    company: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
        marginTop: 10
    },
    price: {
        fontSize: 15,
        color: "#999",
        marginTop: 5,

    },

    thumbnail: {
        width: 200,
        height: 120,
        resizeMode: "cover",
        borderRadius: 2,
    },
    button: {
        height: 32,
        marginTop: 15,
        backgroundColor: "#f05a5b",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 2
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 14,
        paddingHorizontal: 5,
    }



});

export default withNavigation(SpotList);