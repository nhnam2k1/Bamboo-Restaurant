package bamboo.restaurant.controllers;

import bamboo.restaurant.classes.chatMessage.ChatMessage;
import bamboo.restaurant.classes.chatMessage.ChatNotification;
import bamboo.restaurant.interfaces.IChatMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
public class ChatMessageController {
    private IChatMessageService chatMessageService;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    public ChatMessageController(IChatMessageService chatMessageService){
        this.chatMessageService = chatMessageService;
    }

    @MessageMapping("/chat")
    public void processChatMessage(@Payload ChatMessage newChatMessage){
        ChatMessage saved = chatMessageService.postNewMessage(newChatMessage);
        String recipientID = String.valueOf(saved.getRecipientID());
        ChatNotification chatNotification = new ChatNotification(saved.getSenderID(),
                                                "Test");
        messagingTemplate.convertAndSendToUser(recipientID,
                "/queue/messages",
                chatNotification);
    }

    @GetMapping("/messages/{senderID}/{recipientID}")
    public ResponseEntity<?> GetChatMessages(@PathVariable(name="senderID") int senderID,
                                             @PathVariable(name="recipientID") int recipientID) {
        List<ChatMessage> messages = chatMessageService
                                    .getChatMessages(senderID, recipientID);
        return ResponseEntity.ok(messages);
    }

    @GetMapping("/messages/{senderID}/{recipientID}/count")
    public ResponseEntity<Long> countNewMessage(@PathVariable(name="senderID") int senderID,
                                                @PathVariable(name="recipientID") int recipientID){
        Long countNewMessages = chatMessageService
                                .countNewMessages(senderID, recipientID);
        return ResponseEntity.ok(countNewMessages);
    }
}
