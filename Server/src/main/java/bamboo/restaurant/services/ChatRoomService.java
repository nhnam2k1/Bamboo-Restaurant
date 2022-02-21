package bamboo.restaurant.services;

import bamboo.restaurant.classes.chatMessage.ChatRoom;
import bamboo.restaurant.interfaces.IChatRoomRepo;
import bamboo.restaurant.interfaces.IChatRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ChatRoomService implements IChatRoomService {
    private IChatRoomRepo chatRoomRepo;

    @Autowired
    public ChatRoomService(IChatRoomRepo chatRoomRepo){
        this.chatRoomRepo = chatRoomRepo;
    }

    public Optional<String> getChatID(int senderID,
                                      int recipientID,
                                      boolean createIfNotExisted){
        ChatRoom chatRoom = chatRoomRepo.findFirstBySenderIDAndRecipientID(senderID, recipientID);

        if (chatRoom == null){
            if (!createIfNotExisted) return Optional.empty();
            return createChatID(senderID, recipientID);
        }

        return Optional.of(chatRoom.getChatID());
    }

    private Optional<String> createChatID(int senderID, int recipientID) {
        String newChatID = String.format("%s_%s", senderID, recipientID);

        List<ChatRoom> creatingChatRoomList = new ArrayList<>();
        creatingChatRoomList.add(new ChatRoom(newChatID, senderID, recipientID));
        creatingChatRoomList.add(new ChatRoom(newChatID, recipientID, senderID));
        chatRoomRepo.saveAll(creatingChatRoomList);

        return Optional.of(newChatID);
    }
}
