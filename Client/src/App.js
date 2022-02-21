import React from 'react';
import { Switch, Route, BrowserRouter } from "react-router-dom";

import CustomerRoute from "./Components/RouteComponents/CustomerRoute";
import AdminRoute from "./Components/RouteComponents/AdminRoute";

import Logout from "./Utilities/Logout";

import LoginPage from './Login/LoginPage';
import RegistrationPage from './Registration/RegistrationPage';

import AdminLayout from './MainLayout/AdminLayout';
import CustomerLayout from './MainLayout/CustomerLayout';
import Footer from './MainLayout/Footer/Footer';

export default function App() {
  return(
    <BrowserRouter>
        <Switch>
            <Route path="/login" component={LoginPage} exact/>
            <Route path="/registration" component={RegistrationPage} exact/>
            <Route path="/logout" component={Logout} exact/>
            <CustomerRoute path="/customer" component={CustomerLayout}/>
            <AdminRoute path="/admin" component={AdminLayout}/>
        </Switch>
        <Footer/>
    </BrowserRouter>
  );
}