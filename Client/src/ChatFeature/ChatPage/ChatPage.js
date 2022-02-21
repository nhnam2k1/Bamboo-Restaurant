import ChatPanel from "./Components/ChatPanel";
import ContactsBar from "./Components/ContactsBar";

export default function ChatPage(props){
    return(
        <div className="row chat-page-section">
            <ContactsBar/>
            <ChatPanel/>
        </div>
    );
}