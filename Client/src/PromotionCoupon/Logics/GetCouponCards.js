import {GetCouponsAsync} from '../Adapters/PromotionCouponAdapters'
import CouponPromotion from "../CouponPromotion";

export default async function GetCouponCardsAsync(){
    let data = await GetCouponsAsync();

    const couponCards = data.map((detail) => {
        return <CouponPromotion key={detail.id}
                                title={detail.title}
                                description={detail.description}
                                code={detail.code} 
                                expire_at={detail.expireAt}/>
    });
    return couponCards;
}