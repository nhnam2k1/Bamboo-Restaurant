import { GetChatMessagesAsync }  from '../Adapters/ChatRepo';

import InChatMessage from '../../Components/ChatComponents/InChatMessage';
import OutChatMessage from '../../Components/ChatComponents/OutChatMessage';

export default async function GetConversationsAsync(senderID, recipientID) {
    let messages = await GetChatMessagesAsync(senderID, recipientID) || [];
    let sender = senderID;
    let conversions = messages.map(data => {
        const {id, senderID, content} = data;
        if (senderID === sender) return <OutChatMessage key={id} msg={content}/>;
        return <InChatMessage key={id} msg={content}/>;
    }) || [];

    return conversions;
}
