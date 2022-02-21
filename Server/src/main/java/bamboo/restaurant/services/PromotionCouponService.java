package bamboo.restaurant.services;

import bamboo.restaurant.classes.Coupon;
import bamboo.restaurant.interfaces.IPromotionCouponRepo;
import bamboo.restaurant.interfaces.IPromotionCouponService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PromotionCouponService implements IPromotionCouponService {
    private IPromotionCouponRepo promotionCouponRepo;

    @Autowired
    public PromotionCouponService(IPromotionCouponRepo promotionCouponRepo){
        this.promotionCouponRepo = promotionCouponRepo;
    }

    private ModelMapper modelMapper = new ModelMapper();

    public List<Coupon> GetCoupons(){
        return (List<Coupon>) promotionCouponRepo.findAll();
    }

    public Coupon findById(int id) throws Exception {
        Optional<Coupon> c = promotionCouponRepo.findById(id);
        if (!c.isPresent()) throw new Exception("Cannot find the coupon");
        return c.get();
    }

    public Coupon create(Coupon newCoupon){
        return promotionCouponRepo.save(newCoupon);
    }

    public Coupon update(int id, Coupon coupon) throws Exception {
        Optional<Coupon> c = promotionCouponRepo.findById(id);
        if (!c.isPresent()) throw new Exception("Cannot find the coupon");
        Coupon currentCoupon = c.get();
        modelMapper.map(coupon, currentCoupon);
        return promotionCouponRepo.save(currentCoupon);
    }

    public void deleteById(int id){
        promotionCouponRepo.deleteById(id);
    }
}
