import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NewSpot from "./pages/NewSpot";
import SignIn from "./pages/SignIn";

import { Loading } from "./components/Loading"
import { AuthContext } from "./context/authProvider"

import { PrivateRoute } from "./components/PrivateRoute"


export default function Routes() {
    const { currentUser } = useContext(AuthContext);

    return (
        <Router>
            <Switch>


                <Route path="/" exact component={Landing} />
                <Route path="/login" exact component={Login} />

                <PrivateRoute path="/dashboard" component={currentUser ? Dashboard : Loading} />
                <PrivateRoute path="/newspot" component={NewSpot} />


                <Route path="/signin" component={SignIn} />
            </Switch>
        </Router>
    );
}
