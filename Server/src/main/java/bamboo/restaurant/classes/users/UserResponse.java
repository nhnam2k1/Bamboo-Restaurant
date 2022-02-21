package bamboo.restaurant.classes.users;

import bamboo.restaurant.classes.enums.ROLE;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

public class UserResponse {
    @Getter @Setter
    private int id;

    @Getter @Setter
    private String name;

    @Getter @Setter
    private String email;

    @Getter @Setter
    private String address;

    @Setter @Getter
    private ROLE role;

    @Setter @Getter
    private Timestamp createAt;

    @Setter @Getter
    private String token;
}
