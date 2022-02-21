package bamboo.restaurant.interfaces;

import bamboo.restaurant.classes.chatMessage.ChatMessage;
import bamboo.restaurant.classes.enums.MessageStatus;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface IChatMessageRepo extends CrudRepository<ChatMessage, Integer> {

    List<ChatMessage> findByChatID(String chatID);

    long countBySenderIDAndRecipientIDAndStatus(int senderID,
                                                int recipientID,
                                                MessageStatus status);
}
