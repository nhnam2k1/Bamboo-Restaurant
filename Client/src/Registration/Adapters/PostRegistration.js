import axios from '../../Utilities/CustomizeAxios';

export default async function PostRegistrationAsync(profileData){
    let response = await axios.post(`register`, profileData);
    let data = response.data;
    return data;
}