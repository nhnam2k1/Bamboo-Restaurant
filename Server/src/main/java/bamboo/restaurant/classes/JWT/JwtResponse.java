package bamboo.restaurant.classes.JWT;

import lombok.Getter;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import java.io.Serializable;

@RequiredArgsConstructor
public class JwtResponse implements Serializable {

    @NonNull @Getter
    private String token;
}
