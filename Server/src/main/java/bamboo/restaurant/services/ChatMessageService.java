package bamboo.restaurant.services;

import bamboo.restaurant.classes.chatMessage.ChatMessage;
import bamboo.restaurant.classes.enums.MessageStatus;
import bamboo.restaurant.interfaces.IChatMessageRepo;
import bamboo.restaurant.interfaces.IChatMessageService;
import bamboo.restaurant.interfaces.IChatRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ChatMessageService implements IChatMessageService {
    private IChatMessageRepo chatMessageRepo;
    private IChatRoomService chatRoomService;

    @Autowired
    public ChatMessageService(IChatMessageRepo chatMessageRepo, IChatRoomService chatRoomService){
        this.chatMessageRepo = chatMessageRepo;
        this.chatRoomService = chatRoomService;
    }

    public ChatMessage postNewMessage(ChatMessage chatMessage){
        int senderID = chatMessage.getSenderID();
        int recipientID = chatMessage.getRecipientID();

        String chatID = chatRoomService
                        .getChatID(senderID, recipientID, true)
                        .get();

        chatMessage.setStatus(MessageStatus.RECEIVED);
        chatMessage.setChatID(chatID);

        return chatMessageRepo.save(chatMessage);
    }

    public long countNewMessages(int senderID, int recipientId){
        return chatMessageRepo.countBySenderIDAndRecipientIDAndStatus(senderID,
                                recipientId,
                                MessageStatus.RECEIVED);
    }

    public List<ChatMessage> getChatMessages(int senderID, int recipientId){
        Optional<String> chatIdOpt = chatRoomService
                        .getChatID(senderID,
                                   recipientId,
                     false);

        List<ChatMessage> chatMessages = chatIdOpt.map(chatID ->{
            List<ChatMessage> messages = chatMessageRepo.findByChatID(chatID);
            return messages;
        }).orElse(new ArrayList<>());

        List<ChatMessage> markDelivered = markChatMessagesDelivered(chatMessages, senderID, recipientId);
        chatMessageRepo.saveAll(markDelivered);

        return chatMessages;
    }

    private List<ChatMessage> markChatMessagesDelivered(List<ChatMessage> chatMessages,
                                                        int senderID,
                                                        int recipientId){
        List<ChatMessage> markMessagesDelivered = chatMessages.stream()
                .filter(chatMessage -> {
                    boolean receivedCheck = chatMessage.getStatus() == MessageStatus.RECEIVED;
                    boolean senderCheck  = chatMessage.getSenderID() == senderID;
                    boolean recipientCheck = chatMessage.getRecipientID() == recipientId;
                    return receivedCheck && senderCheck && recipientCheck;
                })
                .map(chatMessage -> {
                    chatMessage.setStatus(MessageStatus.DELIVERED);
                    return chatMessage;
                })
                .collect(Collectors.toList());
        return markMessagesDelivered;
    }
}
