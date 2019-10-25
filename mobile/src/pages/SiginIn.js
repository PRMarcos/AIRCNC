import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, ScrollView, KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { AuthContext } from "../context/authProvider"
import Constants from 'expo-constants';

import { ValidateUser } from "../utils/Validation";
import { Subscribe } from "../services/authentication";

import spinner from "../assets/spinner.gif"
import logo from "../assets/logo.png"

export default function SiginIn({ navigation }) {
    const { currentUser } = useContext(AuthContext);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [techs, setTechs] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (currentUser) {
            navigation.navigate("Main")
        }
    }, []);


    async function handleSubmit() {
        setIsLoading(true);
        const errs = ValidateUser({ name, email, techs, password, confirmPassword });

        try {

            if (Object.keys(errs).length > 0) {

                setErrors(errs);
                setIsLoading(false);

            } else {
                await Subscribe({ name, email, techs, password, confirmPassword });
            }


        } catch (error) {
            setIsLoading(false);
            setErrors({ generic: error.message });

        }

    }

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>

            <ScrollView style={styles.scrow} >

                <Image source={logo} style={styles.img} />
                <Text style={styles.labelErr}>{errors.generic}</Text>

                <View style={styles.form}>
                    <Text style={styles.label}>SEU NOME*  <Text style={styles.labelErr}>{errors.name}</Text></Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Nome"
                        placeholderTextColor="#999"
                        autoCapitalize="words"
                        autoCorrect={false}
                        value={name}
                        onChangeText={setName}
                    />

                    <Text style={styles.label}>SEU E-MAIL* <Text style={styles.labelErr}>{errors.email}</Text></Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Seu melhor e-mail"
                        placeholderTextColor="#999"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={email}
                        onChangeText={setEmail}
                    />
                    <Text style={styles.label}>TECHS * <Text style={errors.techs ? styles.labelErr : styles.label}> {errors.techs ? errors.techs : "Sepradas por virgula"}</Text></Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Tecnologias de interesse"
                        placeholderTextColor="#999"
                        autoCapitalize="words"
                        autoCorrect={false}
                        value={techs}
                        onChangeText={setTechs}
                    />
                    <Text style={styles.label}>Sua Senha <Text style={styles.labelErr}>{errors.password}</Text></Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Senha"
                        placeholderTextColor="#999"
                        keyboardType="default"
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry={true}
                        value={password}
                        onChangeText={setPassword}

                    />



                    <Text style={styles.label}>Confirme a senha <Text style={styles.labelErr}>{errors.confirmPassword}</Text></Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Confirme a Senha"
                        placeholderTextColor="#999"
                        keyboardType="default"
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry={true}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}

                    />
                    <TouchableOpacity disabled={isLoading} onPress={handleSubmit} style={isLoading ? styles.butonDisabled : styles.buton}>
                        {isLoading ? <Image style={styles.spinner} source={spinner} /> : <Text style={styles.buttonText}> CADASTRAR </Text>}
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { navigation.navigate("Login") }}>
                        <Text style={styles.labelSignIn}>Já tem conta? Clique aqui para Entrar</Text>
                    </TouchableOpacity>



                </View>

            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: "stretch",
        justifyContent: 'center',
        marginTop: Constants.statusBarHeight,



    },
    img: {
        alignSelf: "center",
    },
    scrow: {
        paddingTop: 15,
        flex: 1,


    },
    form: {
        paddingHorizontal: 30,
        marginTop: 15,
        paddingBottom: 10,
        paddingTop: 10,


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
