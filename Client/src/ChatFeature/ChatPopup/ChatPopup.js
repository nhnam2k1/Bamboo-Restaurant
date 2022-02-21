import React from "react";
import ChatPanel from "./ChatPanel";

import ChatMessageService from "../../Utilities/ChatMessageService";

class ChatPopup extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isChatPanelShown: false
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        this.setState(prevState => ({
            isChatPanelShown: !prevState.isChatPanelShown
        }));
    }

    componentDidMount() {
        try{
            ChatMessageService.connect();
        }
        catch(err){
            let msg = JSON.parse(err);
            alert(msg.message);
        }
    }

    componentWillUnmount() {
        try{
            ChatMessageService.disconnect();
        }
        catch(err){
            let msg = JSON.parse(err);
            alert(msg.message);
        }
    }

    render(){
        return (
            <section>
                <button className="btn btn-primary chat-btn" 
                        onClick={this.handleClick}>
                    <i className="material-icons">comment</i>
                </button>
                {this.state.isChatPanelShown ? <ChatPanel/> : null}
            </section> 
        );
    }
}

export default ChatPopup;