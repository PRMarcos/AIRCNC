import React, { useContext, useState } from 'react';
import { StyleSheet, Alert, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import Constants from 'expo-constants';
import { AuthContext } from "../context/authProvider";

import { AddBooking } from "../services/firestore";
import { isEmpty } from "../utils/Validation";

import logo from '../assets/logo.png'
import spinner from "../assets/spinner.gif"

export default function Booking({ navigation }) {
    const spot = navigation.getParam("spot");
    const [date, setDate] = useState("");
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);


    const { currentUser } = useContext(AuthContext);

    async function handleBack() {
        navigation.navigate("Spots");

    }

    async function handleSubmit() {
        setIsLoading(true);

        try {

            if (isEmpty(date)) {
                setIsLoading(false);
                setErrors({ date: "Date must not be empty" });

            } else {

                const booking = {
                    companyId: spot.ownerId,
                    userId: currentUser.uid,
                    spotId: spot._id,
                    spotName: spot.company,
                    userName: currentUser.displayName,
                    date: date
                };

                await AddBooking(booking);
                Alert.alert("Tudo certo", "Solicitaçao Enviada");
                navigation.navigate("Spots");

            }

        } catch (error) {
            setIsLoading(false);
            setErrors({ generic: error.message });
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image style={styles.image} source={logo} />
            </View>

            <View style={styles.form}>


                <Text style={styles.label}>DATA * <Text style={styles.labelErr}>{errors.date}</Text> </Text>
                <TextInput
                    style={errors.date ? styles.inputErr : styles.input}
                    placeholder="Data de preferencia"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={date}
                    onChangeText={setDate}
                />

                <TouchableOpacity disabled={isLoading} onPress={handleSubmit} style={isLoading ? styles.butonDisabled : styles.button}>
                    {isLoading ? <Image style={styles.spinner} source={spinner} /> : <Text style={styles.buttonText}> SOLICITAR </Text>}
                </TouchableOpacity>

                <TouchableOpacity disabled={isLoading} onPress={handleBack} style={isLoading ? styles.butonDisabled : [styles.button, styles.buttonCancelar]}>
                    <Text style={styles.buttonText}> CANCELAR </Text>
                </TouchableOpacity>
            </View>



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
        paddingHorizontal: 30,
        marginTop: 30,

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
    buttonCancelar: {
        marginTop: 5,
        backgroundColor: "#bd4848",
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
