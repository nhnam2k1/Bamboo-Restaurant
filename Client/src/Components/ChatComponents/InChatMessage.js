export default function InChatMessage(props){


    return (
        <div className="income-msg">
            <img className="chat-avatar" src="assets/img/Hash_Code_2021.png"/>
            <span className="msg">{props.msg}</span>
        </div>
    );
}