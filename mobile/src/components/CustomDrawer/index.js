import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/authProvider"
import { View, SafeAreaView, Text, TouchableOpacity, Image } from "react-native";
import Constants from 'expo-constants';

import { DrawerNavigatorItems } from 'react-navigation-drawer';

import Icon from 'react-native-vector-icons/AntDesign';
import { LogOut } from "../../services/authentication";



export default function CustomDrawer(props) {

    const { currentUser } = useContext(AuthContext);
    const [userName, setUserName] = useState("");

    useEffect(() => {
        if (currentUser) {
            setUserName(currentUser.displayName)
        }
    }, [currentUser]);

    async function handleLogout() {
        await LogOut();
    }

    return (
        < SafeAreaView style={{ flex: 1, }}>

            <View style={{ flexWrap: "wrap", height: 100, backgroundColor: "#f2f2f2", marginTop: Constants.statusBarHeight, alignItems: "center", flexDirection: "row" }}>

                <View style={{ marginLeft: 20, width: 40, alignItems: "flex-start" }} >

                    <View style={{ height: 40, width: 40, backgroundColor: "#fff", borderRadius: 20, alignItems: "center", justifyContent: "center" }}>

                        <Icon name="user" size={30} style={{ color: "#f05a5b" }} />

                    </View>
                </View>

                <View style={{ flex: 1, marginLeft: 5 }} >
                    <Text style={{ fontSize: 16, fontWeight: "bold", paddingHorizontal: 5, color: "#f05a5b" }}>{userName}</Text>

                </View>

            </View>
            <View style={{}}>
                <DrawerNavigatorItems {...props} />
            </View>
            <View style={{ flex: 1, justifyContent: "flex-end" }}>

                <TouchableOpacity onPress={handleLogout} style={{ flexDirection: "row", height: 50, backgroundColor: "#f2f2f2", justifyContent: "center", alignItems: "center", alignSelf: "stretch" }}>

                    <Text style={{ fontSize: 16, fontWeight: "bold", marginRight: 10, color: "#f05a5b" }}>LOGOUT</Text>
                    <Icon name="logout" size={20} style={{ color: "#f05a5b" }} />

                </TouchableOpacity>

            </View>


        </SafeAreaView>
    );
}