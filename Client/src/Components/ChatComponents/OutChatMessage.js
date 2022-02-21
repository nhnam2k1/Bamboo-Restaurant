export default function OutChatMessage(props){
    return (
        <div className="out-msg">
            <span className="my-msg">{props.msg}</span>
            <img className="chat-avatar" src="assets/img/Hash_Code_2021.png"/>
        </div>
    );
}