import React from 'react';
import { View, StyleSheet, Text, Image } from "react-native"
import spinner from "../../assets/spinner.gif";

export function Loading() {

    return (
        <View style={styles.container}>
            <Image source={spinner} />
            <Text style={styles.text}> Loading... </Text>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 25,
        marginBottom: 10,
        color: "#f05a5b",
    }
});
