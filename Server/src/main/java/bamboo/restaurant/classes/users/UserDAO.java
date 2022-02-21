package bamboo.restaurant.classes.users;

import bamboo.restaurant.classes.reservations.Reservation;
import bamboo.restaurant.classes.baseInformation.CreatedUpdatedTime;
import bamboo.restaurant.classes.enums.ROLE;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@NoArgsConstructor
@Entity @Table(name="user")
public class UserDAO extends CreatedUpdatedTime {

    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    @Getter @Setter
    private int id;

    @Getter
    @JsonManagedReference
    @OneToMany(mappedBy = "user",
            cascade = CascadeType.ALL,
            fetch =  FetchType.LAZY,
            orphanRemoval = true)
    private List<Reservation> reservations = new ArrayList<>();

    @NonNull @Getter @Setter
    private String name;

    @NonNull @Getter @Setter
    private String email;

    @NonNull @Getter @Setter
    private String address;

    @Enumerated(EnumType.STRING)
    @NonNull @Setter @Getter
    private ROLE role = ROLE.CUSTOMER;

    @NonNull @Getter @Setter
    private String username;

    @JsonIgnore @Getter @Setter
    private String password;

    public void addReservation(Reservation reservation){
        reservations.add(reservation);
        reservation.setUser(this);
    }

    public void removeReservation(Reservation reservation){
        reservations.remove(reservation);
        reservation.setUser(null);
    }
}
