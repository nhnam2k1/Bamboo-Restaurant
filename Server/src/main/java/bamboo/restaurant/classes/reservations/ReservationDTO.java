package bamboo.restaurant.classes.reservations;

import lombok.*;

import java.sql.Date;
import java.sql.Time;

@RequiredArgsConstructor
@NoArgsConstructor
public class ReservationDTO {
    @Setter @Getter
    private int id;

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
}
