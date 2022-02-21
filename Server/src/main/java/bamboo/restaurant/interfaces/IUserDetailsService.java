package bamboo.restaurant.interfaces;

import bamboo.restaurant.classes.JWT.JwtRequest;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface IUserDetailsService extends UserDetailsService {
    String generateToken(JwtRequest request) throws Exception;
}
