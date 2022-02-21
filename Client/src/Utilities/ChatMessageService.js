import SockJS from "sockjs-client";
import Stomp from "stompjs";

import UserDetailService from "./UserDetailService";

const BASE_URL = process.env.REACT_APP_API_URL;

/*
    This service will also build based on Pub / Sub pattern
    https://medium.com/globant/the-js-bifrost-publish-subscribe-pattern-in-javascript-df796b7a4c12
*/ 

const ChatMessageService = () => {
    const ListOfReceivedMessagesCallbacks = [];

    let stompClient = null;
    let subscription = null;
    
    const subscribeReceiveChatMessageHandler = (callback) => {
        let index = ListOfReceivedMessagesCallbacks.push(callback) - 1;
        return{
            unsubscribe(){
                ListOfReceivedMessagesCallbacks.splice(index, 1);
            } 
        }
    };

    const connect = () => {
        const socket = new SockJS(`${BASE_URL}ws`);
        stompClient = Stomp.over(socket);
        stompClient.connect({}, onConnected, onError);
    };

    const sendMessage = (messageData) => {
        stompClient.send("/app/chat", {}, JSON.stringify(messageData));
    };

    const disconnect = () => {
        stompClient.disconnect(()=>{
            subscription && subscription.unsubscribe();
            console.log("Disconnected from server");
        });
    }

    const onConnected = () => {
        const userID = UserDetailService.getUserDetail().id;
        const receiveNotifcationLocation = `/user/${userID}/queue/messages`;
        
        subscription = stompClient.subscribe(receiveNotifcationLocation, data =>{
            ListOfReceivedMessagesCallbacks.forEach((callback) => {
                if (typeof(callback) === 'function') callback(data.body);
            });
        });
    }

    const onError = (error) => {
        console.log(error);
    }

    return {
        connect,
        subscribeReceiveChatMessageHandler,
        sendMessage,
        disconnect
    }
}

export default ChatMessageService();