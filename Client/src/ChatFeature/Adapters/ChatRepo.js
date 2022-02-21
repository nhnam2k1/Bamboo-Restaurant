import axios from "../../Utilities/CustomizeAxios";

async function GetChatMessagesAsync(senderID, recipientID){
    let response = await axios.get(`/messages/${senderID}/${recipientID}`);
    let data = response.data;
    return data;
}

async function CountUnreadMessagesAsync(senderID, recipientID){
    let response = await axios.get(`/messages/${senderID}/${recipientID}/count`);
    let data = response.data;
    return data;
}

export {
    GetChatMessagesAsync,
    CountUnreadMessagesAsync
}