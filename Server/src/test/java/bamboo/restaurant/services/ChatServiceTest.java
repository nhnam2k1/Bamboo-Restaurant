package bamboo.restaurant.services;

import bamboo.restaurant.classes.chatMessage.ChatMessage;
import bamboo.restaurant.classes.enums.MessageStatus;
import bamboo.restaurant.interfaces.IChatMessageRepo;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.util.Assert;

import java.util.List;
import java.util.Optional;

@ExtendWith(MockitoExtension.class)
@SpringBootTest
public class ChatServiceTest {

    private static ChatMessage c1, c2, c3;

    @Mock
    private IChatMessageRepo chatMessageRepo;

    @Mock
    private ChatRoomService chatRoomService;

    @InjectMocks
    private ChatMessageService chatMessageService;

    @BeforeAll
    public static void init() {
        c1 = new ChatMessage("1_2", 1, 2, "Hello", MessageStatus.RECEIVED);
        c2 = new ChatMessage("1_2", 1, 2, "Hello", MessageStatus.RECEIVED);
        c3 = new ChatMessage("1_2", 1, 2, "Hello", MessageStatus.RECEIVED);
    }

    @Test
    public void findAllTest_WhenNoRecord() {
        Mockito.when(chatRoomService
                        .getChatID(1, 2, false))
                .thenReturn(Optional.empty());

        List<ChatMessage> chatMessages = chatMessageService.getChatMessages(1, 2);
        Assert.isTrue(chatMessages.isEmpty());
    }

    @Test
    public void findAllTest_WhenRecord() {
        Mockito.when(chatRoomService
                        .getChatID(1, 2, false))
                .thenReturn(Optional.of("1_2"));

        Mockito.when(chatMessageRepo.findByChatID("1_2"))
                .thenReturn(List.of(c1, c2, c3));

        List<ChatMessage> chatMessages = chatMessageService.getChatMessages(1, 2);
        Assert.isTrue(chatMessages.size() == 3);
        Assert.isTrue(chatMessages.get(0) == c1);
        Assert.isTrue(chatMessages.get(1) == c2);
        Assert.isTrue(chatMessages.get(2) == c3);
    }

    @Test
    void create() {
        Mockito.when(chatRoomService
                        .getChatID(1, 2, true))
                .thenReturn(Optional.of("1_2"));
        Mockito.when(chatMessageRepo.save(c1)).thenReturn(c1);

        ChatMessage newChat = chatMessageService.postNewMessage(c1);

        Assert.isTrue(newChat.getChatID() == "1_2");
        Assert.isTrue(newChat.getStatus() == MessageStatus.RECEIVED);
        Mockito.verify(chatMessageRepo, Mockito.times(1)).save(c1);
    }

    @Test
    void countNewMessage(){
        Mockito.when(chatMessageRepo
                .countBySenderIDAndRecipientIDAndStatus(1, 2, MessageStatus.RECEIVED))
                .thenReturn(3L);
        Assert.isTrue(chatMessageService.countNewMessages(1, 2) == 3);
    }
}