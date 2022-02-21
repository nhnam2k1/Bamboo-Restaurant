package bamboo.restaurant.classes.chatMessage;

import lombok.*;

@NoArgsConstructor
@RequiredArgsConstructor
public class ChatNotification {

    @NonNull @Getter @Setter
    private int senderID;

    @NonNull @Getter @Setter
    private String senderName;
}
