import React, { useEffect, useState } from "react";
import { useRouteMatch, useLocation, useHistory } from "react-router-dom";

import UserDetailService from "../../../Utilities/UserDetailService";
import ChatMessageService from "../../../Utilities/ChatMessageService";
import ChatInputComponent from "../../../Components/ChatComponents/ChatInputComponent";
import GetConversationsAsync from "../../Logics/GetConversations";

const ChatPanel = () => {
    const superRoute = useRouteMatch();
    const location = useLocation();
    const history = useHistory();
    const route = useRouteMatch(`${superRoute.url}/:id`) || {};
    const params = route.params || {};

    const ME = UserDetailService.getUserDetail().id;

    const [conversations, setConversations] = useState([]);
    const [userTitle, setUserTitle] = useState("");
    const [chatInputComponent, setChatInputComponent] = useState(<ChatInputComponent/>);

    useEffect(() => {
        const UpdateConversations = () => {
            try{
                if (params.id === undefined) return;
                const senderID = ME;
                const recipientID = params.id;
                GetConversationsAsync(senderID, recipientID)
                .then((newConversations) => {
                    setConversations(newConversations);
                });
            }
            catch(err){
                let msg = JSON.parse(err);
                alert(msg.message);
            }
        }

        const handleUpcomingMessages = (payload) => {
            try{
                const parsedData = JSON.parse(payload);
                const senderID = parsedData.senderID;
                if (senderID != params.id) return;
                UpdateConversations();
            }
            catch(err){
                let msg = JSON.parse(err);
                alert(msg.message);
            }
        }

        const handleSubmit = (data) =>{
            try{
                const senderID = ME;
                const recipientID = params.id;
                const content = data.trim();
    
                if (content !== "" && recipientID !== undefined){
                    const payload = {senderID, recipientID, content};
                    ChatMessageService.sendMessage(payload);
                    UpdateConversations();
                    history.push(location.pathname);
                }
            }
            catch(err){
                let msg = JSON.parse(err);
                alert(msg.message);
            }
        };

        UpdateConversations(); // First reload the message 
        setUserTitle(params.id != null ? `User ${params.id}` : "Which user....");
        setChatInputComponent(<ChatInputComponent onSubmit={handleSubmit}/>);
        const upcomingMessagesHandler = ChatMessageService
                                        .subscribeReceiveChatMessageHandler(handleUpcomingMessages);
        
        return () => {
            upcomingMessagesHandler.unsubscribe();
        };

    }, [location, ME, history, params.id]); // Mostly useState have to inside useEffect

    return(
        <div className="col-md-7 col-lg-8 col-xl-8 col-xxl-8 chat-page-col">
            <div className="chat-popup-header">
                <h4>{userTitle}</h4>
            </div>
            <div className="chat-area chat-page-area">
                {conversations}
            </div>
            {chatInputComponent}
        </div>
    );
}

export default React.memo(ChatPanel);