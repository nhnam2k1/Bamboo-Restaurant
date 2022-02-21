package bamboo.restaurant.controllers;

import bamboo.restaurant.classes.JWT.JwtRequest;
import bamboo.restaurant.classes.users.UserDTO;
import bamboo.restaurant.classes.users.UserResponse;
import bamboo.restaurant.interfaces.IUserDetailsService;
import bamboo.restaurant.interfaces.IUserService;
import javassist.bytecode.DuplicateMemberException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class AuthenticationController {
    private IUserDetailsService jwtUserDetailsService;
    private IUserService userService;

    @Autowired
    public AuthenticationController(IUserService userService, IUserDetailsService jwtUserDetailsService){
        this.userService = userService;
        this.jwtUserDetailsService = jwtUserDetailsService;
    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> createJwtToken(@Validated @RequestBody JwtRequest request)
            throws Exception {
        String token = jwtUserDetailsService.generateToken(request);
        UserResponse userResponse = userService.getUserDetail(token);
        return ResponseEntity.ok(userResponse);
    }

    @PostMapping("/register")
    public ResponseEntity<?>  registerUser(@Validated @RequestBody UserDTO newUser)
            throws Exception {
        try{
            UserResponse registeredUser = userService.registerUserDetail(newUser);
            return ResponseEntity.status(HttpStatus.CREATED).body(registeredUser);
        }
        catch (DuplicateMemberException ex){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
    }
}