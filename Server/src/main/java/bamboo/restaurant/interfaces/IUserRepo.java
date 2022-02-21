package bamboo.restaurant.interfaces;

import bamboo.restaurant.classes.users.UserDAO;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IUserRepo extends CrudRepository<UserDAO, Integer> {
    UserDAO findByUsername(String username);
}
