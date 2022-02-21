package bamboo.restaurant.services;

import bamboo.restaurant.classes.Coupon;
import bamboo.restaurant.interfaces.IPromotionCouponRepo;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.util.Assert;

import java.sql.Date;
import java.util.Arrays;
import java.util.Optional;

@ExtendWith(MockitoExtension.class)
@SpringBootTest

public class PromotionCouponServiceTest {
    private static Coupon c1, c2, c3;

    @Mock
    private IPromotionCouponRepo promotionCouponRepo;

    @InjectMocks
    private PromotionCouponService promotionCouponService;

    @BeforeAll
    public static void init() {
        c1 = new Coupon("Discount", "Fun", "EDFD-FGDC", Date.valueOf("2022-10-21"));
        c2 = new Coupon("Prize", "Night", "EDD-BCD", Date.valueOf("2021-09-21"));
        c3 = new Coupon("Normal", "Lunch", "LUNCH-FGDC", Date.valueOf("2022-08-10"));
    }

    @Test
    public void GetCouponsTest_WhenNoRecord() {
        Mockito.when(promotionCouponRepo.findAll()).thenReturn(Arrays.asList());
        Assert.isTrue(promotionCouponService.GetCoupons().size() == 0, "Find reservations");
        Mockito.verify(promotionCouponRepo, Mockito.times(1)).findAll();
    }

    @Test
    public void GetCouponsTest_WhenRecord() {
        Mockito.when(promotionCouponRepo.findAll()).thenReturn(Arrays.asList(c1, c2));
        Assert.isTrue(promotionCouponService.GetCoupons().size() == 2, "");
        Assert.isTrue(promotionCouponService.GetCoupons().get(0) == c1, "");
        Assert.isTrue(promotionCouponService.GetCoupons().get(1) == c2, "");
        Mockito.verify(promotionCouponRepo, Mockito.times(3)).findAll();
    }

    @Test
    public void findById() throws Exception {
        Mockito.when(promotionCouponRepo.findById(1)).thenReturn(Optional.of(c1));
        Assert.isTrue(promotionCouponService.findById(1) == c1, "Find by ID");
        Mockito.verify(promotionCouponRepo, Mockito.times(1)).findById(1);
    }

    @Test
    void create() {
        Mockito.when(promotionCouponRepo.save(c1)).thenReturn(c1);
        Assert.isTrue(promotionCouponService.create(c1) == c1, "Creating");
        Mockito.verify(promotionCouponRepo, Mockito.times(1)).save(c1);
    }

    @Test
    void deleteById() {
        promotionCouponService.deleteById(1);
        Mockito.verify(promotionCouponRepo, Mockito.times(1)).deleteById(1);
    }
}