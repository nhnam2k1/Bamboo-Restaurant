import ls from "./SecureLocalStorage";

const AuthService = () =>{

    const ENCRYPTING = {encrypt : true};
    const DECRYPTING = {decrypt : true};

    const getAccessToken = () => ls.get("accessToken", DECRYPTING);

    const getRefreshToken = () => ls.get("refreshToken", DECRYPTING);

    const setAccessToken = (token) =>{
        ls.set("accessToken", token, ENCRYPTING);
        return true;
    }

    const setRefreshToken = (token) =>{
        ls.set("refreshToken", token, ENCRYPTING);
        return true;
    }

    const eraseToken = () =>{
        ls.remove("accessToken");
        ls.remove("refreshToken");
        return true;
    }

    return{
        getAccessToken,
        getRefreshToken,
        setAccessToken,
        setRefreshToken,
        eraseToken
    }
}

export default AuthService();
//https://marmelab.com/blog/2020/07/02/manage-your-jwt-react-admin-authentication-in-memory.html