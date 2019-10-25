import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../../context/authProvider"

export const PrivateRoute = ({ component: Component, user, ...rest }) => {

  const { currentUser } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={props =>
        !!currentUser ? (
          <Component {...props} />
        ) : (
            <Redirect
              to={{ pathname: "/", state: { from: props.location } }}
            />
          )
      }
    />
  );
};
