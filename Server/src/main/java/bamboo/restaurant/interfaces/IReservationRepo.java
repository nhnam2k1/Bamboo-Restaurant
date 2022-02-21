package bamboo.restaurant.interfaces;

import bamboo.restaurant.classes.reservations.Reservation;
import org.springframework.data.repository.CrudRepository;

public interface IReservationRepo extends CrudRepository<Reservation, Integer> {
}
