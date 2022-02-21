package bamboo.restaurant.interfaces;

import bamboo.restaurant.classes.reservations.Reservation;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

@Service
public interface IReservationService {
    List<Reservation> findAll(Map<String, String> headers);

    Reservation create(Reservation reservation, Map<String, String> headers);

    Reservation update(int id,
                       Reservation reservation,
                       Map<String, String> headers)
                throws NoSuchElementException;

    Reservation findById(int id, Map<String, String> headers) throws NoSuchElementException ;

    void deleteById(int id, Map<String, String> headers) throws NoSuchElementException ;
}
