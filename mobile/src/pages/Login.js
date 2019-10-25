import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { AuthContext } from "../context/authProvider"

import spinner from "../assets/spinner.gif"
import logo from "../assets/logo.png"

import { validateSession } from "../utils/Validation"
import { LoginFirebase } from "../services/authentication";

export default function Login({ navigation }) {
    const { currentUser } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        if (currentUser) {
            navigation.navigate("Main")
        }
    }, [currentUser]);

    async function handleSubmit() {
        setIsLoading(true);
        const errs = validateSession(email, password);

        try {

            if (Object.keys(errs).length > 0) {

                setErrors(errs);
                setIsLoading(false);

            } else {

                //try login
                await LoginFirebase(email, password);
            }


        } catch (error) {
            setIsLoading(false);
            setErrors({ generic: error.message });

        }


    }

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>

            <Image source={logo} />

            <View style={styles.form}>
                <Text style={styles.labelErr}>{errors.generic}</Text>

                <Text style={styles.label}>SEU E-MAIL <Text style={styles.labelErr}>{errors.email}</Text> </Text>
                <TextInput
                    style={errors.email ? styles.inputErr : styles.input}
                    placeholder="Seu e-mail"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={email}
                    onChangeText={setEmail}
                />
                <Text style={styles.label}>SUA SENHA <Text style={styles.labelErr}>{errors.password}</Text> </Text>
                <TextInput
                    style={errors.password ? styles.inputErr : styles.input}
                    placeholder="Senha"
                    placeholderTextColor="#999"
                    keyboardType="default"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}

                />
                <TouchableOpacity disabled={isLoading} onPress={handleSubmit} style={isLoading ? styles.butonDisabled : styles.buton}>
                    {isLoading ? <Image style={styles.spinner} source={spinner} /> : <Text style={styles.buttonText}> ENTRAR </Text>}
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { navigation.navigate("SignIn") }}>
                    <Text style={styles.labelSignIn}>Nao tem conta? Clique aqui para se cadastrar</Text>
                </TouchableOpacity>


            </View>

        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',

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
    labelSignIn: {
        color: "#AAA",
        marginTop: 10,
        fontSize: 12,
        alignSelf: "center",
        padding: 10,
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
    buton: {
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
