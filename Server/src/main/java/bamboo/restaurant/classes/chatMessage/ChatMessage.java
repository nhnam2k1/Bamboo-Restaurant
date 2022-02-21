package bamboo.restaurant.classes.chatMessage;

import bamboo.restaurant.classes.baseInformation.CreatedUpdatedTime;
import bamboo.restaurant.classes.enums.MessageStatus;
import lombok.*;

import javax.persistence.*;

@NoArgsConstructor
@RequiredArgsConstructor
@Entity
public class ChatMessage extends CreatedUpdatedTime {
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    @Getter @Setter
    private int id;

    @NonNull @Setter @Getter
    private String chatID;

    @NonNull @Setter @Getter
    private int senderID;

    @NonNull @Setter @Getter
    private int recipientID;

    @NonNull @Setter @Getter
    private String content;

    @NonNull @Setter @Getter
    private MessageStatus status;
}
