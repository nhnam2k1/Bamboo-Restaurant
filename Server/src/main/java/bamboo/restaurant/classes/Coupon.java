package bamboo.restaurant.classes;

import bamboo.restaurant.classes.baseInformation.CreatedUpdatedTime;
import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.sql.Date;

@RequiredArgsConstructor
@NoArgsConstructor
@Entity
public class Coupon extends CreatedUpdatedTime {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Getter @Setter
    private int id;

    @NonNull @Setter @Getter
    private String title;

    @NonNull @Setter @Getter
    private String description;

    @NonNull @Setter @Getter
    private String code;

    @NonNull @Setter @Getter
    private Date expireAt;
}
