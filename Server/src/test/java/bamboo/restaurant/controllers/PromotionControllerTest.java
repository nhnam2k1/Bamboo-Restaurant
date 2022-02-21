package bamboo.restaurant.controllers;

import bamboo.restaurant.classes.Coupon;
import bamboo.restaurant.services.PromotionCouponService;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.Assert;

import java.sql.Date;
import java.util.Arrays;
import java.util.List;
import java.util.NoSuchElementException;

@ExtendWith(MockitoExtension.class)
@SpringBootTest
public class PromotionControllerTest {
    private static Coupon c1, c2, c3;

    @Mock
    private PromotionCouponService promotionCouponService;

    @InjectMocks
    private PromotionCouponController promotionCouponController;

    @BeforeAll
    public static void setUp(){
        c1 = new Coupon("Dscount", "Desc", "1223", new Date(111220202));
        c2 = new Coupon("Dscount", "Desc", "1223", new Date(111220202));
        c3 = new Coupon("Dscount", "Desc", "1223", new Date(111220202));
    }

    @Test
    void findAll_whenNoRecord() {
        Mockito.when(promotionCouponService.GetCoupons())
                .thenReturn(Arrays.asList());

        ResponseEntity<List<Coupon>> response = (ResponseEntity<List<Coupon>>) promotionCouponController
                                                .GetCoupons();
        List<Coupon> coupons = response.getBody();

        Assert.isTrue(response.getStatusCode() == HttpStatus.OK);
        Assert.isTrue(coupons.isEmpty());
    }

    @Test
    void findAll_whenRecord() {
        Mockito.when(promotionCouponService.GetCoupons())
                .thenReturn(Arrays.asList(c1, c2, c3));

        ResponseEntity<List<Coupon>> response = (ResponseEntity<List<Coupon>>) promotionCouponController
                                                .GetCoupons();
        List<Coupon> coupons = response.getBody();

        Assert.isTrue(response.getStatusCode() == HttpStatus.OK);
        Assert.isTrue(coupons.size() == 3);
        Assert.isTrue(coupons.get(0) == c1);
        Assert.isTrue(coupons.get(1) == c2);
        Assert.isTrue(coupons.get(2) == c3);
    }

    @Test
    void create() {
        Mockito.when(promotionCouponService.create(c1)).thenReturn(c1);

        ResponseEntity<Coupon> response = (ResponseEntity<Coupon>) promotionCouponController
                                        .AddCoupon(c1);
        Coupon coupon = response.getBody();

        Assert.isTrue(response.getStatusCode() == HttpStatus.CREATED);
        Assert.isTrue(coupon == c1);
    }

    @Test
    void update_WhenNotFound() throws Exception {
        Mockito.when(promotionCouponService.update(1, c1))
                .thenThrow(new NoSuchElementException());

        ResponseEntity<Coupon> response = (ResponseEntity<Coupon>) promotionCouponController
                                        .UpdateCoupon(1, c1);

        Assert.isTrue(response.getStatusCode() == HttpStatus.BAD_REQUEST);
        Mockito.verify(promotionCouponService, Mockito.times(1))
                .update(1, c1);
    }

    @Test
    void update_WhenFound() throws Exception {
        Mockito.when(promotionCouponService.update(1, c1))
                .thenReturn(c1);

        ResponseEntity<Coupon> response = (ResponseEntity<Coupon>) promotionCouponController
                .UpdateCoupon(1, c1);

        Assert.isTrue(response.getStatusCode() == HttpStatus.ACCEPTED);
        Assert.isTrue(response.getBody() == c1);
        Mockito.verify(promotionCouponService, Mockito.times(1))
                .update(1, c1);
    }

    @Test
    void deleteById_WhenNotFound() {
        Mockito.doThrow(new NoSuchElementException())
                .when(promotionCouponService)
                .deleteById(1);

        ResponseEntity<?> response = promotionCouponController.DeleteCoupon(1);
        Assert.isTrue(response.getStatusCode() == HttpStatus.BAD_REQUEST);
    }

    @Test
    void deleteById_WhenFound() {
        Mockito.doNothing().when(promotionCouponService).deleteById(1);
        ResponseEntity<?> response = promotionCouponController.DeleteCoupon(1);
        Assert.isTrue(response.getStatusCode() == HttpStatus.ACCEPTED);
    }
}