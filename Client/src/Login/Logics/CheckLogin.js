import ValidateCrendential from './ValidateCredential';
import GetAuthTokenAsync from "../Adapters/GetAuthToken";

import AuthService from "../../Utilities/AuthService";
import UserDetailService from "../../Utilities/UserDetailService";

export default async function CheckLoginAsync(data){
    const {username, password} = data;
    let extractedData = {username, password};
    await ValidateCrendential(extractedData);
        
    let userCredential = await GetAuthTokenAsync(extractedData);
    let {token, role} = userCredential;

    AuthService.setAccessToken(token);
    UserDetailService.setUserDetail(userCredential);

    return {token, role};
}