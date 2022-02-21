package bamboo.restaurant.interfaces;

import bamboo.restaurant.classes.Coupon;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IPromotionCouponRepo extends CrudRepository<Coupon, Integer> {
}
