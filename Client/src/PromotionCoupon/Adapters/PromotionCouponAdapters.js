import axios from '../../Utilities/CustomizeAxios';

async function GetCouponsAsync(){
    let response = await axios.get(`/promotions/me`);
    let data = response.data;
    return data;
}

export {
    GetCouponsAsync,
}