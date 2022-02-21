import axios from '../../Utilities/CustomizeAxios';

const BASE_URL = process.env.REACT_APP_API_URL;

async function GetReservationsAsync(){
    let response = await axios.get(`reservation/me`);
    let data = response.data;
    return data;
}

async function PostNewReservationAsync(reservation){
    let response = await axios.post(`reservation/add`, reservation);
    return response.data;
}

async function PutReservationAsync(id, reservation){
    let response = await axios.put(`reservation/update/${id}`, reservation);
    return response.data;
}

async function DeleteReservationAsync(id){
    let msg = await axios.delete(`reservation/delete/${id}`);
    return msg;
}

export {
    GetReservationsAsync,
    PostNewReservationAsync,
    PutReservationAsync,
    DeleteReservationAsync
};