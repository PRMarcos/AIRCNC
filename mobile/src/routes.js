import { createAppContainer, createSwitchNavigator } from "react-navigation"


import Login from "./pages/Login"
import SignIn from "./pages/SiginIn"
import Main from "./pages/Main"

const Routes = createAppContainer(
    createSwitchNavigator({
        Login,
        SignIn,
        Main

    })
);

export default Routes;