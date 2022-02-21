package bamboo.restaurant.services;

import bamboo.restaurant.config.securityConfig.JwtTokenUtil;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class HeadersService {

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    public Map<String, String> ProcessHeaders(Map<String, String> headers){
        headers = processToken(headers);
        return headers;
    }

    private Map<String, String> processToken(Map<String, String> headers){
        if (headers.containsKey("authorization")){
            String jwtToken = headers.get("authorization").substring(7);
            Claims claims = jwtTokenUtil.getAllClaimsFromToken(jwtToken);
            claims.forEach((key, value) -> {
                headers.put(key, String.valueOf(value));
            });
        }
        return headers;
    }
}
