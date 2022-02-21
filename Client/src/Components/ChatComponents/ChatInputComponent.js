import { useState } from 'react';

export default function ChatInputComponent(props){
    const [message, setMessage] = useState("");

    const handleChange = (event) =>{
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setMessage(value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(message);
        props.onSubmit(message);
        setMessage("");
    }

    return(
        <form className="chat-input-area" onSubmit={handleSubmit}>
            <input type="text" name="message" 
                    value={message}
                    onChange={handleChange}/>
            <button className="btn btn-primary submit-msg" type="submit">
                <i className="material-icons">send</i>
            </button>
        </form>
    );
}