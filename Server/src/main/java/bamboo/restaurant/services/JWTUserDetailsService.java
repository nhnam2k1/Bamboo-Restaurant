package bamboo.restaurant.services;

import bamboo.restaurant.classes.JWT.JwtRequest;
import bamboo.restaurant.classes.enums.ROLE;
import bamboo.restaurant.classes.users.UserDAO;
import bamboo.restaurant.interfaces.IJwtTokenUtil;
import bamboo.restaurant.interfaces.IUserDetailsService;
import bamboo.restaurant.interfaces.IUserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class JWTUserDetailsService implements IUserDetailsService {
    private IUserRepo userRepo;
    private IJwtTokenUtil jwtTokenUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    public JWTUserDetailsService(IUserRepo userRepo, IJwtTokenUtil jwtTokenUtil){
        this.userRepo = userRepo;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @Override
    public UserDetails loadUserByUsername(String Username)
            throws UsernameNotFoundException {

        UserDAO checkedUser = userRepo.findByUsername(Username);

        if (checkedUser != null){
            String username = checkedUser.getUsername();
            String password = checkedUser.getPassword();
            List<SimpleGrantedAuthority> roles = new ArrayList<>();
            String userRole = checkedUser.getRole().toString();
            if (userRole == null) userRole = ROLE.CUSTOMER.toString();
            roles.add(new SimpleGrantedAuthority(userRole));
            return new User(username, password, roles);
        }
        else{
            throw new UsernameNotFoundException("Cannot find this username");
        }
    }

    public String generateToken(JwtRequest request) throws Exception {
        Map<String, String> extractData = ValidateUsernameAndPassword(request);
        Map<String, Object> claims = new HashMap<>();

        String username = extractData.get("username");
        UserDetails userDetails = loadUserByUsername(username);
        UserDAO user = userRepo.findByUsername(username);

        claims.put("id", user.getId());

        String token = jwtTokenUtil.generateTokenWithClaims(claims, userDetails);
        return token;
    }

    private Map<String, String> ValidateUsernameAndPassword(JwtRequest request) throws Exception {
        String username = request.getUsername();
        String password = request.getPassword();

        authenticate(username, password);

        Map<String, String> extracted = new HashMap<>();

        extracted.put("username", username);
        extracted.put("password", password);

        return extracted;
    }

    private void authenticate(String username, String password)
            throws Exception
    {
        try {
            // This manager has use the BCrypt password to format
            UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(username, password);
            authenticationManager.authenticate(token);
        }
        catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        }
        catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
        catch (Exception e){
            throw  e;
        }
    }
}