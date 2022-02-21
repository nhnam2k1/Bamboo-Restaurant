package bamboo.restaurant.controllers;

import bamboo.restaurant.classes.reservations.Reservation;
import bamboo.restaurant.classes.reservations.ReservationDTO;
import bamboo.restaurant.services.HeadersService;
import bamboo.restaurant.services.ReservationService;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.Assert;

import java.sql.Date;
import java.sql.Time;
import java.util.*;
import java.util.stream.Collectors;

@ExtendWith(MockitoExtension.class)
@SpringBootTest
public class ReservationControllerTests {
    private static Reservation r1, r2, r3;
    private static Map<String, String> headers;
    private ModelMapper modelMapper = new ModelMapper();

    @Mock
    private ReservationService reservationService;

    @Mock
    private HeadersService headersService;

    @InjectMocks
    private ReservationController reservationController;

    @BeforeAll
    public static void setUp(){
        headers = new HashMap<>();
        headers.put("id", "1");

        r1 = new Reservation(Date.valueOf("2020-03-01"), Time.valueOf("11:00:00"), Time.valueOf("12:00:00"),
                            4, "Night", "Aisle");
        r2 = new Reservation(Date.valueOf("2020-05-09"), Time.valueOf("15:00:00"), Time.valueOf("16:00:00"),
                            6, "Party", "Outside");
        r3 = new Reservation(Date.valueOf("2021-10-19"), Time.valueOf("18:00:00"), Time.valueOf("19:00:00"),
                            3, "Solo", "Near Windows");
    }

    @Test
    void findAll_whenNoRecord() {
        Mockito.when(reservationService.findAll(headers)).thenReturn(Arrays.asList());
        Mockito.when(headersService.ProcessHeaders(headers)).thenReturn(headers);

        ResponseEntity<List<ReservationDTO>> response = (ResponseEntity<List<ReservationDTO>>) reservationController
                                                    .GetReservations(headers);
        List<ReservationDTO> reservations = response.getBody();

        Assert.isTrue(reservations.size() == 0);
        Assert.isTrue(response.getStatusCode() == HttpStatus.OK);
        Mockito.verify(reservationService, Mockito.times(1)).findAll(headers);
    }

    @Test
    void findAll_whenRecord() {
        List<Reservation> combo = List.of(r1, r2);
        Mockito.when(reservationService.findAll(headers)).thenReturn(combo);
        Mockito.when(headersService.ProcessHeaders(headers)).thenReturn(headers);

        ResponseEntity<List<ReservationDTO>> response = (ResponseEntity<List<ReservationDTO>>) reservationController
                                                        .GetReservations(headers);

        List<ReservationDTO> reservations = response.getBody();
        List<ReservationDTO> checked = combo.stream()
                                        .map(this::convertToDTO)
                                        .collect(Collectors.toList());

        Assert.isTrue(response.getStatusCode() == HttpStatus.OK);
        Assert.isTrue(reservations.size() == 2);
        Assert.isTrue(reservations.get(0) == checked.get(0));
        Assert.isTrue(reservations.get(1) == checked.get(1));
        Mockito.verify(reservationService, Mockito.times(1)).findAll(headers);
    }

    @Test
    void create() {
        Mockito.when(headersService.ProcessHeaders(headers)).thenReturn(headers);
        Mockito.when(reservationService.create(r1, headers)).thenReturn(r1);

        ReservationDTO newReserv = modelMapper.map(r1, ReservationDTO.class);
        ResponseEntity<ReservationDTO> response = (ResponseEntity<ReservationDTO>) reservationController
                                                .AddReservation(newReserv, headers);

        ReservationDTO reserv = response.getBody();
        Assert.isTrue(response.getStatusCode() == HttpStatus.CREATED);
        Assert.isTrue(newReserv == reserv);
        Mockito.verify(reservationService, Mockito.times(1)).create(r1, headers);
    }

    @Test
    void update_WhenNotFound() {
        Mockito.when(headersService.ProcessHeaders(headers)).thenReturn(headers);
        Mockito.when(reservationService.update(1, r1, headers))
                .thenThrow(new NoSuchElementException());

        ReservationDTO selectedReser = modelMapper.map(r1, ReservationDTO.class);
        ResponseEntity<Reservation> response = (ResponseEntity<Reservation>) reservationController
                                                .UpdateReservation(1, selectedReser, headers);

        Assert.isTrue(response.getStatusCode() == HttpStatus.BAD_REQUEST);
        Mockito.verify(reservationService, Mockito.times(1))
                .update(1, r1, headers);
    }

    @Test
    void update_WhenFound() {
        Mockito.when(headersService.ProcessHeaders(headers)).thenReturn(headers);
        Mockito.when(reservationService.update(1, r1, headers)).thenReturn(r1);

        ReservationDTO selectedReser = modelMapper.map(r1, ReservationDTO.class);
        ResponseEntity<Reservation> response = (ResponseEntity<Reservation>) reservationController
                .UpdateReservation(1, selectedReser, headers);

        Assert.isTrue(response.getStatusCode() == HttpStatus.ACCEPTED);
        Mockito.verify(reservationService, Mockito.times(1))
                .update(1, r1, headers);
    }

    @Test
    void deleteById_WhenNotFound() {
        Mockito.when(headersService.ProcessHeaders(headers)).thenReturn(headers);
        Mockito.doThrow(new NoSuchElementException())
                .when(reservationService)
                .deleteById(1, headers);

        ResponseEntity<?> response = reservationController.DeleteReservation(1, headers);
        Assert.isTrue(response.getStatusCode() == HttpStatus.BAD_REQUEST);
        Mockito.verify(reservationService, Mockito.times(1))
                .deleteById(1, headers);
    }

    @Test
    void deleteById_WhenFound() {
        Mockito.when(headersService.ProcessHeaders(headers)).thenReturn(headers);
        Mockito.doNothing().when(reservationService).deleteById(1, headers);

        ResponseEntity<?> response = reservationController.DeleteReservation(1, headers);
        Assert.isTrue(response.getStatusCode() == HttpStatus.ACCEPTED);
        Mockito.verify(reservationService, Mockito.times(1))
                .deleteById(1, headers);
    }

    private ReservationDTO convertToDTO(Reservation reservation){
        return modelMapper.map(reservation, ReservationDTO.class);
    }
    private Reservation convertToEntity(ReservationDTO reservationDTO){
        return modelMapper.map(reservationDTO, Reservation.class);
    }
}