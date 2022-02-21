package bamboo.restaurant.classes.JWT;

import lombok.*;

import java.io.Serializable;

@NoArgsConstructor
@RequiredArgsConstructor
public class JwtRequest implements Serializable {

    @NonNull @Getter @Setter
    private String username;
    
    @NonNull @Getter @Setter
    private String password;
}
