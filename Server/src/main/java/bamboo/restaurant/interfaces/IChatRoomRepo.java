package bamboo.restaurant.interfaces;

import bamboo.restaurant.classes.chatMessage.ChatRoom;
import org.springframework.data.repository.CrudRepository;

public interface IChatRoomRepo extends CrudRepository<ChatRoom, Integer> {
    ChatRoom findFirstBySenderIDAndRecipientID(int senderID, int recipientID);
}
