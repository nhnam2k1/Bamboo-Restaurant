import axios from '../../Utilities/CustomizeAxios';

export default async function GetAuthTokenAsync(credential){
    let response = await axios.post(`authenticate`, credential);
    let data = response.data;
    return data;
}