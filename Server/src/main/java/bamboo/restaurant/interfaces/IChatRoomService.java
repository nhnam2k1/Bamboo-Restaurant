package bamboo.restaurant.interfaces;

import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public interface IChatRoomService {
    Optional<String> getChatID(int senderID,
                               int recipientID,
                               boolean createIfNotExisted);
}
