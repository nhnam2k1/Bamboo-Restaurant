import React from "react";
import {  Route, useHistory } from "react-router-dom";

import AuthService from "../../Utilities/AuthService";


export default function AdminRoute ({ component: Component, ...rest }) {
    const token = AuthService.getAccessToken();
    const history = useHistory();
    
    if (token === null) {
        history.push("/login");
        return null;
    }

    return <Route {...rest}  component={Component}/>;
}