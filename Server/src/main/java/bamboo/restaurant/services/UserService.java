package bamboo.restaurant.services;

import bamboo.restaurant.classes.enums.ROLE;
import bamboo.restaurant.classes.users.UserDAO;
import bamboo.restaurant.classes.users.UserDTO;
import bamboo.restaurant.classes.users.UserResponse;
import bamboo.restaurant.interfaces.IJwtTokenUtil;
import bamboo.restaurant.interfaces.IUserRepo;
import bamboo.restaurant.interfaces.IUserService;
import io.jsonwebtoken.Claims;
import javassist.bytecode.DuplicateMemberException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class UserService implements IUserService {
    private IUserRepo userRepo;
    private IJwtTokenUtil jwtTokenUtil;

    private PasswordEncoder bcryptEncoder;
    private ModelMapper modelMapper;

    @Autowired
    public UserService(IUserRepo userRepo, IJwtTokenUtil jwtTokenUtil){
        this.userRepo = userRepo;
        this.jwtTokenUtil = jwtTokenUtil;
        this.bcryptEncoder = new BCryptPasswordEncoder();
        this.modelMapper = new ModelMapper();
    }

    public UserResponse getUserDetail(String token){
        Claims claims = jwtTokenUtil.getAllClaimsFromToken(token);
        int userID = Integer.valueOf(claims.get("id").toString());
        UserDAO user = userRepo.findById(userID).get();

        UserResponse repsonse = modelMapper.map(user, UserResponse.class);
        repsonse.setToken(token);

        return repsonse;
    }

    public UserResponse getUserDetail(int userID){
        Optional<UserDAO> userOpt = userRepo.findById(userID);
        if (!userOpt.isPresent()) throw new NoSuchElementException("Cannot find this user");

        UserDAO user = userOpt.get();
        UserResponse repsonse = modelMapper.map(user, UserResponse.class);
        return repsonse;
    }

    public UserResponse registerUserDetail(UserDTO newUser) throws DuplicateMemberException {
        UserDAO user = userRepo.findByUsername(newUser.getUsername()) ;
        if (user != null) throw new DuplicateMemberException("This username has been existed");

        user = modelMapper.map(newUser, UserDAO.class);
        String password = user.getPassword();
        user.setPassword(bcryptEncoder.encode(password));
        user.setRole(ROLE.CUSTOMER);

        UserDAO registeredUser = userRepo.save(user);
        UserResponse response = modelMapper.map(registeredUser, UserResponse.class);
        return response;
    }

    public UserResponse updateUser(int userID, UserDTO updatedUser) {
        Optional<UserDAO> userOpt = userRepo.findById(userID);
        if (!userOpt.isPresent()) throw new NoSuchElementException("Cannot find this user");
        UserDAO currentUser = userOpt.get();
        UserDAO updateUser = modelMapper.map(updatedUser, UserDAO.class);

        updateUser.setId(currentUser.getId());
        updateUser.setRole(currentUser.getRole());
        updateUser = userRepo.save(updateUser);

        UserResponse response = modelMapper.map(updateUser, UserResponse.class);
        return response;
    }
}
