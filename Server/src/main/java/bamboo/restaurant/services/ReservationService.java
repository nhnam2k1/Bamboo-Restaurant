package bamboo.restaurant.services;

import bamboo.restaurant.classes.reservations.Reservation;
import bamboo.restaurant.classes.users.UserDAO;
import bamboo.restaurant.interfaces.IReservationRepo;
import bamboo.restaurant.interfaces.IReservationService;
import bamboo.restaurant.interfaces.IUserRepo;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

@Service
public class ReservationService implements IReservationService {
    private IReservationRepo reservationRepo;
    private IUserRepo userRepo;
    private ModelMapper modelMapper;

    @Autowired
    public ReservationService(IReservationRepo reservationRepo, IUserRepo userRepo){
        this.reservationRepo = reservationRepo;
        this.userRepo = userRepo;
        modelMapper = new ModelMapper();
    }

    public List<Reservation> findAll(Map<String, String> headers) {
        UserDAO user = GetCurrentUser(headers);
        List<Reservation> reservations = user.getReservations();
        return reservations;
    }

    public Reservation create(Reservation reservation,
                              Map<String, String> headers){
        UserDAO user = GetCurrentUser(headers);
        Reservation newReservation = reservationRepo.save(reservation);
        user.addReservation(newReservation);
        newReservation = reservationRepo.save(newReservation);
        return newReservation;
    }

    public Reservation update(int id,
                              Reservation reservation,
                              Map<String, String> headers) throws NoSuchElementException {
        UserDAO user = GetCurrentUser(headers);
        Reservation currentReservation = CheckReservationExistInCurrentUser(user, id);
        if (currentReservation == null)
            throw new NoSuchElementException("The reservation does not existed !");

        Reservation updatedReservation = modelMapper.map(reservation, Reservation.class);
        updatedReservation.setId(currentReservation.getId());
        return reservationRepo.save(updatedReservation);
    }

    public Reservation findById(int id,
                                Map<String, String> headers) throws NoSuchElementException {
        UserDAO user = GetCurrentUser(headers);
        Reservation currentReservation = CheckReservationExistInCurrentUser(user, id);
        if (currentReservation == null)
            throw new NoSuchElementException("The reservation does not existed !");

        return currentReservation;
    }

    public void deleteById(int id,
                           Map<String, String> headers) throws NoSuchElementException {
        UserDAO user = GetCurrentUser(headers);
        Reservation currentReservation = CheckReservationExistInCurrentUser(user, id);
        if (currentReservation == null)
            throw new NoSuchElementException("The reservation does not existed !");

        user.removeReservation(currentReservation);
        reservationRepo.deleteById(id);
    }

    private UserDAO GetCurrentUser(Map<String, String> headers){
        int userID = Integer.valueOf(headers.get("id"));
        UserDAO user = userRepo.findById(userID).get();
        return user;
    }
    private Reservation CheckReservationExistInCurrentUser(UserDAO user, int reservationID){
        List<Reservation> reservations = user.getReservations();
        Reservation findReservation = reservations.stream()
                    .filter(reservation -> reservation.getId() == reservationID)
                    .findAny().orElse(null);
        return findReservation;
    }
}
