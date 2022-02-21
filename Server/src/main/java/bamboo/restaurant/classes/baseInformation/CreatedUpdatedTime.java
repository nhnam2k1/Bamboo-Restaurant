package bamboo.restaurant.classes.baseInformation;

import lombok.Data;
import lombok.Getter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import java.sql.Timestamp;

@Data
@MappedSuperclass
public abstract class CreatedUpdatedTime {

    @Column(updatable = false)
    @CreationTimestamp @Getter
    private Timestamp createAt;

    @UpdateTimestamp
    @Getter
    private Timestamp updatedAt;
}
