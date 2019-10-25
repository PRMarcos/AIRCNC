import React, { useContext, useEffect } from "react";

import { AuthContext } from "../context/authProvider"

import CustomDrawer from "../components/CustomDrawer"
import { createAppContainer } from "react-navigation"
import { createDrawerNavigator } from 'react-navigation-drawer';


import MagnifierIcon from 'react-native-vector-icons/Entypo';
import BookingIcon from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';


import Booking from "./Booking"
import List from "./List"
import BookingList from "./BookingList"
import About from "./About"


const DrawerNav = createAppContainer(
    createDrawerNavigator({

        Spots: {
            screen: List,
            navigationOptions: {
                drawerLabel: "Spots",
                drawerIcon: ({ tintColor }) => (<MagnifierIcon name="magnifying-glass" size={20} style={{ color: tintColor }} />),

            }
        },
        Bookings: {
            screen: BookingList,
            navigationOptions: {
                drawerLabel: "Reservas",
                drawerIcon: ({ tintColor }) => (<BookingIcon name="notebook" size={20} style={{ color: tintColor }} />),

            }
        },
        About: {
            screen: About,
            navigationOptions: {
                drawerLabel: "Sobre",
                drawerIcon: ({ tintColor }) => (<Feather name="info" size={20} style={{ color: tintColor }} />),

            }
        },
        Booking: {
            screen: Booking,
            navigationOptions: {
                drawerLabel: () => null, // provisorio
            }
        }

    }, {
        contentComponent: CustomDrawer,
        contentOptions: {
            activeTintColor: "#f05a5b",
        }

    })
);



export default function Main({ navigation }) {
    const { currentUser } = useContext(AuthContext);


    useEffect(() => {
        if (!currentUser) {
            navigation.navigate("Login")
        }
    }, [currentUser]);

    return (
        <DrawerNav />
    );
}



// Pssibilidade

//        import { DrawerItems } from 'react-navigation';
//        
//        const visibleItems = ['HomeScreen', 'SettingsScreen', 'HelpScreen'];
//        
//        const getVisible = item => contains(item.key, visibleItems);
//        
//        const getFilteredAndStyledItems = ({ items, ...other }) => (
//          <DrawerItems
//            items={filter(getVisible, items)}
//            {...other}
//          />
//        );
//        ...
//        contentComponent: getFilteredAndStyledItems
//        ...
// 


