package bamboo.restaurant.classes.chatMessage;

import lombok.*;

import javax.persistence.*;

@NoArgsConstructor
@RequiredArgsConstructor
@Entity
public class ChatRoom {

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
}
