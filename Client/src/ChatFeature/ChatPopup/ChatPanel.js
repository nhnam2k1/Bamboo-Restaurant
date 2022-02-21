import React from "react";
import { withRouter } from "react-router-dom";
import ChatMessageService from "../../Utilities/ChatMessageService";
import UserDetailService from "../../Utilities/UserDetailService";

import ChatInputComponent from "../../Components/ChatComponents/ChatInputComponent";
import GetConversationsAsync from "../Logics/GetConversations";

class ChatPanel extends React.Component{
    constructor(props) {
        super(props);
        this.ME = UserDetailService.getUserDetail().id;
        this.CUSTOMER_SUPPORTER = 1;
        this.handler = null;

        this.state = {messages: []};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpcomingMessages = this.handleUpcomingMessages.bind(this);
        this.UpdateConversations = this.UpdateConversations.bind(this);
    }

    UpdateConversations(){
        const {ME, CUSTOMER_SUPPORTER} = this;
        GetConversationsAsync(ME, CUSTOMER_SUPPORTER)
        .then((newConversations)=>{
            this.setState({
                messages: newConversations,
            });
        });
    }

    handleUpcomingMessages(payload) {
        try{
            const parsedData = JSON.parse(payload);
            const recipientID = parsedData.senderID;
            
            if (recipientID != this.CUSTOMER_SUPPORTER) return;
            this.UpdateConversations();
        }
        catch(err){
            let msg = JSON.parse(err);
            alert(msg.message);
        }
    }

    handleSubmit(data) {
        try{
            const {history, location} = this.props;
            const senderID = this.ME;
            const recipientID = this.CUSTOMER_SUPPORTER;
            const content = data.trim();
            
            if (content !== "" && senderID !== undefined){
                const payload = {senderID, recipientID, content};
                ChatMessageService.sendMessage(payload);
                this.UpdateConversations();
                history.push(location.pathname);
            }
        }
        catch(err){
            let msg = JSON.parse(err);
            alert(msg.message);
        }
    }

    componentDidMount() {
        try{
            this.handler = ChatMessageService
                        .subscribeReceiveChatMessageHandler(this.handleUpcomingMessages);
            this.UpdateConversations();
        }
        catch(err){
            let msg = JSON.parse(err);
            alert(msg.message);
        }
    }
  
    componentWillUnmount() {
        try{
            this.handler && this.handler.unsubscribe();
            this.handler = null;
        }
        catch(err){
            let msg = JSON.parse(err);
            alert(msg.message);
        }
    }

    render(){
        return (
            <div className="chat-popup show">
                <div className="badge"></div>
                <div className="chat-popup-header">
                    <h5>Customer Support</h5>
                </div>
                <div className="chat-area">{this.state.messages}</div>
                <ChatInputComponent onSubmit={this.handleSubmit}/>
            </div>
        );
    }
}

export default withRouter(ChatPanel);