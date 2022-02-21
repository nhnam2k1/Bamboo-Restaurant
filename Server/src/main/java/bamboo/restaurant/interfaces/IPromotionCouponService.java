package bamboo.restaurant.interfaces;

import bamboo.restaurant.classes.Coupon;

import java.util.List;

public interface IPromotionCouponService {
    List<Coupon> GetCoupons();
    Coupon findById(int id) throws Exception;
    Coupon create(Coupon newCoupon);
    Coupon update(int id, Coupon coupon) throws Exception;
    void deleteById(int id);
}