package bamboo.restaurant.interfaces;

import bamboo.restaurant.classes.users.UserDTO;
import bamboo.restaurant.classes.users.UserResponse;
import javassist.bytecode.DuplicateMemberException;
import org.springframework.stereotype.Service;

@Service
public interface IUserService {
    UserResponse getUserDetail(String token);
    UserResponse getUserDetail(int userID);
    UserResponse registerUserDetail(UserDTO newUser) throws DuplicateMemberException;
    UserResponse updateUser(int userID, UserDTO updatedUser);
}
