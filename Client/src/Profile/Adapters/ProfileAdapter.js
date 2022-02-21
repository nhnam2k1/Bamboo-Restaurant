import axios from "../../Utilities/CustomizeAxios";

import AuthService from "../../Utilities/AuthService";
import UserDetailService from "../../Utilities/UserDetailService";

async function GetProfileDataAsync(){
    let data = UserDetailService.getUserDetail();

    // if the local storage expire then we should get data from server again

    const {name, email, address, role, createAt} = data;
    return {name, email, address, role, createAt};
}

async function UpdateProfileDataAsync(updateUserData){
    let id = UserDetailService.getUserDetail().id;
    let response = await axios.put(`users/${id}/update`, updateUserData);
    return response.data;
}

export{
    GetProfileDataAsync,
    UpdateProfileDataAsync
}