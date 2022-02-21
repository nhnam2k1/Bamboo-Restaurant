package bamboo.restaurant.classes.reservations;

import bamboo.restaurant.classes.baseInformation.CreatedUpdatedTime;
import bamboo.restaurant.classes.users.UserDAO;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;

import javax.persistence.*;
import java.sql.Date;
import java.sql.Time;

@RequiredArgsConstructor
@NoArgsConstructor
@Entity
public class Reservation extends CreatedUpdatedTime {
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    @Getter @Setter
    private int id;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @Getter @Setter
    private UserDAO user;

    @NonNull @Getter @Setter
    private Date date;

    @NonNull @Getter @Setter
    private Time startTime;

    @NonNull @Getter @Setter
    private Time endTime;

    @NonNull @Getter @Setter
    private int numberPeople;

    @NonNull @Getter @Setter
    private String description;

    @NonNull @Getter @Setter
    private String tableChoice;

    @Getter @Setter
    private String allergies;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Reservation )) return false;
        return id == ((Reservation) o).id;
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}

//https://www.baeldung.com/jackson-bidirectional-relationships-and-infinite-recursion