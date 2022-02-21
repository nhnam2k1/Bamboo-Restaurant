import React, {useState, useEffect} from "react";
import ContactCard from "./ContactCard";

import ChatMessageService from "../../../Utilities/ChatMessageService";

const ContactsBar = () => {
    const [contactList, setContactList] = useState([]);
    let data = [];

    const generateExample = () =>{    
        for (let i = 0; i < 20; i++){
            let senderID = i;
            let senderName = `User ${i}`;
            data.push({senderID, senderName});
        }
    }

    const handleUpcomingMessages = (payload) =>{
        const parsedData = JSON.parse(payload);
        const {senderID, senderName} = parsedData;

        let filteredData = data.filter(value => value.senderID !== senderID);
        let currentTime = new Date();
        let hour = currentTime.getHours();
        let minute = currentTime.getMinutes();
        parsedData.senderName = `User ${senderID}`;
        parsedData.time = `${hour}:${minute}`;
        let newData = [parsedData, ...filteredData];
        data = newData;

        ConvertToContactCards();
    }

    const ConvertToContactCards = ()=>{
        const newContactCards = data.map(value => {
            const {senderID, senderName, time} = value;
            let Time = time != null ? time : "Me";

            return <ContactCard name={senderName}
                        key={senderID}
                        id={senderID}
                        time={Time}/>
        });
        setContactList(newContactCards);
    }

    useEffect(()=>{
        // Runs inital
        const handler = ChatMessageService
                        .subscribeReceiveChatMessageHandler(handleUpcomingMessages);
        generateExample();
        ConvertToContactCards();

        ChatMessageService.connect();
        return () =>{
            handler.unsubscribe();
            ChatMessageService.disconnect();
        }
    },[]);

    return(
        <div className="col-md-5 col-lg-4 col-xl-4 col-xxl-4 chat-page-col">
            <input  type="text" 
                    styles="border-radius: 10px" 
                    placeholder="Search the name here..."/>
            <div className="chat-history-customers-area">
                <ul className="list-unstyled">
                    {contactList}
                </ul>
            </div>
        </div>
    );
}

export default React.memo(ContactsBar);