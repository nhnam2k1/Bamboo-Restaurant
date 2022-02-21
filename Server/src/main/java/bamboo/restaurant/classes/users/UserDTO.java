package bamboo.restaurant.classes.users;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

public class UserDTO {
    @NonNull @Getter @Setter
    private String name;

    @NonNull @Getter @Setter
    private String email;

    @NonNull @Getter @Setter
    private String address;

    @NonNull @Getter @Setter
    private String username;

    @NonNull @Getter @Setter
    private String password;
}
