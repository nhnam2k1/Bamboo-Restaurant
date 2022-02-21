package bamboo.restaurant.controllers;

import bamboo.restaurant.classes.reservations.Reservation;
import bamboo.restaurant.classes.reservations.ReservationDTO;
import bamboo.restaurant.interfaces.IReservationService;
import bamboo.restaurant.services.HeadersService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping("/reservation")
public class ReservationController {
    private IReservationService reservationService;

    private HeadersService headersService;
    private ModelMapper modelMapper;

    @Autowired
    public ReservationController(IReservationService reservationService){
        this.reservationService = reservationService;
        headersService = new HeadersService();
        modelMapper = new ModelMapper();
    }

    @GetMapping("/me")
    public ResponseEntity<?> GetReservations(@RequestHeader Map<String,String> headers){
        try{
            headers = headersService.ProcessHeaders(headers);
            List<Reservation> reservations = reservationService.findAll(headers);
            List<ReservationDTO> response = reservations.stream()
                                            .map(this::convertToDTO)
                                            .collect(Collectors.toList());
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
        catch (Exception ex){
            return new ResponseEntity<>(ex, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/add")
    public ResponseEntity<?> AddReservation(@RequestBody ReservationDTO newReservation,
                                            @RequestHeader Map<String,String> headers){
        try{
            headers = headersService.ProcessHeaders(headers);
            Reservation reservation = modelMapper.map(newReservation, Reservation.class);
            reservation = reservationService.create(reservation, headers);
            ReservationDTO createdReservation = modelMapper.map(reservation, ReservationDTO.class);
            return new ResponseEntity<>(createdReservation, HttpStatus.CREATED);
        }
        catch (Exception ex){
            return new ResponseEntity<>(ex, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> UpdateReservation(@PathVariable int id,
                                               @RequestBody ReservationDTO reservationDTO,
                                               @RequestHeader Map<String,String> headers){
        try{
            headers = headersService.ProcessHeaders(headers);
            Reservation reservation = modelMapper.map(reservationDTO, Reservation.class);
            reservation = reservationService.update(id, reservation, headers);
            ReservationDTO updatedReservation = modelMapper.map(reservation, ReservationDTO.class);
            return new ResponseEntity<>(updatedReservation, HttpStatus.ACCEPTED);
        }
        catch (NoSuchElementException ex){
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
        catch (Exception ex){
            return new ResponseEntity<>(ex, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> DeleteReservation(@PathVariable int id,
                                               @RequestHeader Map<String,String> headers){
        try{
            headers = headersService.ProcessHeaders(headers);
            reservationService.deleteById(id, headers);
            return new ResponseEntity<>("Successful deleted reservation", HttpStatus.ACCEPTED);
        }
        catch (NoSuchElementException ex){
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
        catch (Exception ex){ 
            return new ResponseEntity<>(ex, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private ReservationDTO convertToDTO(Reservation reservation){
        return modelMapper.map(reservation, ReservationDTO.class);
    }
    private Reservation convertToEntity(ReservationDTO reservationDTO){
        return modelMapper.map(reservationDTO, Reservation.class);
    }
}
