import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { UPpdateFinished } from "../../services/firestore";


export default function BookingItem({ booking }) {

    const { _id, date, finished, spotName, status } = booking;

    function getStatusString(status) {
        switch (status) {
            case "acept":
                return "CONFIRMADO";
            case "reject":
                return "REJEITADA";
            case "pendding":
                return "PENDENTE";
        }
    }

    function getStatusStyle(status) {
        switch (status) {
            case "acept":
                return styles.confirmed;
            case "reject":
                return styles.Rejected;
            case "pendding":
                return styles.pendding;
        }
    }
    async function handleConfirm(_id) {

        await UPpdateFinished(_id);
    }

    return (
        <View style={styles.container}>
            <View style={styles.left}>
                <Text style={styles.SpotName}> {spotName} </Text>
                <Text style={styles.date}> {date}</Text>
            </View>


            <View style={styles.right}>
                <Text style={styles.status}> Status</Text>
                <Text style={getStatusStyle(status)}> {getStatusString(status)} </Text>
                {!finished && (
                    <TouchableOpacity style={styles.button} onPress={() => handleConfirm(_id)}>
                        <Text style={styles.buttonText}>Confirmar</Text>
                    </TouchableOpacity>)}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 100,
        borderRadius: 5,
        backgroundColor: "#f7f7f7",
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    button: {
        height: 20,
        marginTop: 5,
        backgroundColor: "#f05a5b",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 2
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 12,
        paddingHorizontal: 5,
    },
    right: {
        marginRight: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    left: {
        marginLeft: 20,
        alignItems: "flex-start",
        justifyContent: "center"
    },
    SpotName: {
        fontSize: 16,
        fontWeight: "bold",
    },
    date: {
        fontSize: 14,
    },
    status: {
        fontSize: 16,
        fontWeight: "bold",
    },
    confirmed: {
        fontSize: 14,
        color: "green"
    },
    Rejected: {
        fontSize: 14,
        color: "red"
    },
    pendding: {
        fontSize: 14,
        color: "orange"
    }

});
