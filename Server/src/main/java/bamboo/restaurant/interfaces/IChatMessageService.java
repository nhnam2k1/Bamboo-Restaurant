package bamboo.restaurant.interfaces;

import bamboo.restaurant.classes.chatMessage.ChatMessage;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface IChatMessageService {
    ChatMessage postNewMessage(ChatMessage chatMessage);
    long countNewMessages(int senderID, int recipientId);
    List<ChatMessage> getChatMessages(int senderID, int recipientId);
}