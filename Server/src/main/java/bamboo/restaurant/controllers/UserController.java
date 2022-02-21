package bamboo.restaurant.controllers;

import bamboo.restaurant.classes.users.UserDTO;
import bamboo.restaurant.classes.users.UserResponse;
import bamboo.restaurant.interfaces.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;

@CrossOrigin
@RestController
@RequestMapping("/users")
public class UserController {
    private IUserService userService;

    @Autowired
    public UserController(IUserService userService){
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> GetUserDetailByID(@PathVariable int id){
        try{
            UserResponse user = userService.getUserDetail(id);
            return ResponseEntity.ok(user);
        }
        catch (NoSuchElementException ex){
            return ResponseEntity.badRequest()
                    .body(ex.getMessage());
        }
    }

    @PutMapping("/{id}/update")
    public ResponseEntity<?> UpdateUserDetail(@PathVariable int id,
                                              @RequestBody UserDTO updateUser){
        try{
            UserResponse user = userService.updateUser(id, updateUser);
            return ResponseEntity.accepted().body(user);
        }
        catch (NoSuchElementException ex){
            return ResponseEntity.badRequest()
                    .body(ex.getMessage());
        }
    }
}
