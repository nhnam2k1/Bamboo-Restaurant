import React from "react";
import  { Redirect } from "react-router-dom";
import AuthService from './AuthService';
import UserDetailService from './UserDetailService';

const Logout = () => {
    AuthService.eraseToken();
    UserDetailService.eraseUserDetail();
    return <Redirect push to="/login"/>;
};

export default React.memo(Logout);