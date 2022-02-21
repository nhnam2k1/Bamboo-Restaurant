import ls from './SecureLocalStorage';

const UserDetailService = () =>{

    const ENCRYPTING = {encrypt : true};
    const DECRYPTING = {decrypt : true};

    const getUserDetail = () => ls.get("userDetail", DECRYPTING);

    const setUserDetail = (data) =>{
        ls.set("userDetail", data, ENCRYPTING);
        return true;
    }

    const eraseUserDetail = () =>{
        ls.remove("userDetail");
        return true;
    }

    return{
        getUserDetail,
        setUserDetail,
        eraseUserDetail
    }
}

export default UserDetailService();