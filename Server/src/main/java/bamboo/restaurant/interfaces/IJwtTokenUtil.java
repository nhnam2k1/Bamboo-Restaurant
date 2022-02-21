package bamboo.restaurant.interfaces;

import io.jsonwebtoken.Claims;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Date;
import java.util.Map;
import java.util.function.Function;

public interface IJwtTokenUtil {
    String getUsernameFromToken(String token);
    Date getExpirationDateFromToken(String token);
    <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver);
    Boolean validateToken(String token, UserDetails userDetails);
    String generateToken(UserDetails userDetails);
    Claims getAllClaimsFromToken(String token);
    String generateTokenWithClaims(Map<String, Object> claims,
                                          UserDetails userDetails);
}
