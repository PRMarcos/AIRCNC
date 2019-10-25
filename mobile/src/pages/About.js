import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Linking } from 'react-native';
import Constants from 'expo-constants';


import logo from '../assets/logo.png';
import Entypo from 'react-native-vector-icons/Entypo';

export default function About({ navigation }) {


    function handeOpenMenu() {
        navigation.openDrawer();
    }
    async function handleClickWebPlataform() {
        await Linking.openURL("https://aircnc-31224.web.app/");
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


                <Text style={styles.info}>
                    Essa app foi desenvolvido com o intuito de praticar
                        o uso das ferramentas de desenvolvimento mobile usando
                        React Native.
                </Text>

                <Text style={styles.info}>
                    A ideia foi utilizar a ideia de negócio do Airbnb e aplicar
                        na área de desenvolvimento. Dessa forma empresas podem fornecer
                        locais onde programadores podem trabalhar e colaborar com o time
                        da empresa, enquanto os desenvolvedores podem escolher entre os
                        Spots fornecidos de acordo com as tecnologias que as empresas
                        trabalham e solicitar uma reserva no Spot.
                </Text>

                <Text style={styles.info}>
                    Ao receber solicitaçoes de reserva a empresa através da plataforma
                        web pode aceitar ou recusar de acordo com sua disponibilidade, assim
                        que a empresa responder o usuário será notificado.
                </Text>

                <Text style={styles.info}>
                    Todo usuario cadastrado pode criar um Spot na plataforma Web,
                        basta acessar e fornecer dados de login.

                </Text>

                <TouchableOpacity style={styles.button} onPress={handleClickWebPlataform}>
                    <Text style={styles.buttonText}>Acesse a plataforma web</Text>
                </TouchableOpacity>
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
    form: {
        alignSelf: "stretch",
        paddingHorizontal: 30,
        marginTop: 30,
        marginBottom: 20,

    },
    info: {
        fontSize: 16,
        textAlign: "justify",
        marginBottom: 10,

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
        fontSize: 16,
        paddingHorizontal: 5,
    }
});
