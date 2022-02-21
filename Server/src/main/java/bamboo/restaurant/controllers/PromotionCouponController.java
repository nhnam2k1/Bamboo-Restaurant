package bamboo.restaurant.controllers;

import bamboo.restaurant.classes.Coupon;
import bamboo.restaurant.interfaces.IPromotionCouponService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@CrossOrigin
@RestController
@RequestMapping("/promotions")
public class PromotionCouponController {
    private IPromotionCouponService promotionCouponService;

    @Autowired
    public PromotionCouponController(IPromotionCouponService promotionCouponService){
        this.promotionCouponService = promotionCouponService;
    }

    @GetMapping("/me")
    public ResponseEntity<?> GetCoupons(){
        try{
            List<Coupon> coupons = promotionCouponService.GetCoupons();
            return new ResponseEntity<>(coupons, HttpStatus.OK);
        }
        catch (NoSuchElementException ex){
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
        catch (Exception ex){
            return new ResponseEntity<>(ex, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PostMapping("/add")
    public ResponseEntity<?> AddCoupon(@RequestBody Coupon newCoupon){
        try{
            Coupon coupon = promotionCouponService.create(newCoupon);
            return new ResponseEntity(coupon, HttpStatus.CREATED);
        }
        catch (Exception ex){
            return new ResponseEntity<>(ex, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<?> UpdateCoupon(@PathVariable int id, @RequestBody Coupon newCoupon){
        try{
            Coupon coupon = promotionCouponService.update(id, newCoupon);
            return new ResponseEntity(coupon, HttpStatus.ACCEPTED);
        }
        catch (NoSuchElementException ex){
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
        catch (Exception ex){
            return new ResponseEntity<>(ex, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> DeleteCoupon(@PathVariable int id){
        try{
            promotionCouponService.deleteById(id);
            return new ResponseEntity<>("Successful deleted coupon", HttpStatus.ACCEPTED);
        }
        catch (NoSuchElementException ex){
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
        catch (Exception ex){
            return new ResponseEntity<>(ex, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
