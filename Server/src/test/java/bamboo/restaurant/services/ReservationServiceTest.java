package bamboo.restaurant.services;

import bamboo.restaurant.classes.reservations.Reservation;
import bamboo.restaurant.classes.users.UserDAO;
import bamboo.restaurant.interfaces.IReservationRepo;
import bamboo.restaurant.interfaces.IUserRepo;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.util.Assert;

import java.sql.Date;
import java.sql.Time;
import java.util.*;

@ExtendWith(MockitoExtension.class)
@SpringBootTest
public class ReservationServiceTest {
    private static UserDAO user;
    private static Map<String, String> headers;
    private static Reservation r1, r2, r3;

    @Mock
    private IReservationRepo reservationRepo;

    @Mock
    private IUserRepo userRepo;

    @InjectMocks
    private ReservationService reservationService;

    @BeforeAll
    public static void init() {
        headers = new HashMap<>();
        headers.put("id", "1");

        user = new UserDAO("Admin","admin@gmail.com", "", "admin");

        r1 = new Reservation(Date.valueOf("2020-03-01"), Time.valueOf("11:00:00"), Time.valueOf("12:00:00"),
                4, "Night", "Aisle");
        r2 = new Reservation(Date.valueOf("2020-05-09"), Time.valueOf("15:00:00"), Time.valueOf("16:00:00"),
                6, "Party", "Outside");
        r3 = new Reservation(Date.valueOf("2021-10-19"), Time.valueOf("18:00:00"), Time.valueOf("19:00:00"),
                3, "Solo", "Near Windows");

        r1.setId(1);
        r2.setId(2);
        r3.setId(3);
    }

    @Test
    public void findAllTest_WhenNoRecord() {
        user = new UserDAO("Admin","admin@gmail.com", "", "admin");
        Mockito.when(userRepo.findById(1)).thenReturn(Optional.of(user));
        System.out.println(reservationService.findAll(headers).size());
        Assert.isTrue(reservationService.findAll(headers).isEmpty(), "Find reservations");
    }

    @Test
    public void findAllTest_WhenRecord() {
        user = new UserDAO("Admin","admin@gmail.com", "", "admin");
        user.addReservation(r1);
        user.addReservation(r2);

        Mockito.when(userRepo.findById(1)).thenReturn(Optional.of(user));
        List<Reservation> reservations = reservationService.findAll(headers);

        Assert.isTrue(reservations.size() == 2, "");
        Assert.isTrue(reservations.get(0) == r1);
        Assert.isTrue(reservations.get(1) == r2);
    }

    @Test
    public void findById() {
        user.addReservation(r1);
        user.addReservation(r2);

        Mockito.when(userRepo.findById(1)).thenReturn(Optional.of(user));

        Assert.isTrue(reservationService.findById(r1.getId(), headers) == r1, "Find by ID");
        Assert.isTrue(reservationService.findById(r2.getId(), headers) == r2, "Find by ID");
    }

    @Test
    void create() {
        Mockito.when(userRepo.findById(1)).thenReturn(Optional.of(user));
        Mockito.when(reservationRepo.save(r1)).thenReturn(r1);
        Assert.isTrue(reservationService.create(r1, headers) == r1, "Creating");
        Mockito.verify(reservationRepo, Mockito.times(1)).save(r1);
    }

    @Test
    void deleteById() {
        user.addReservation(r1);
        Mockito.when(userRepo.findById(1)).thenReturn(Optional.of(user));
        reservationService.deleteById(1, headers);
        Mockito.verify(reservationRepo, Mockito.times(1)).deleteById(1);
    }
}