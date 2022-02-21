import {Switch, Route, useRouteMatch} from "react-router-dom";

import Header from "./Header/Header";
import ChatPopup from "../ChatFeature/ChatPopup/ChatPopup";

import ProfilePage from "../Profile/ProfilePage";
import PromotionCouponPage from "../PromotionCoupon/PromotionCouponPage";
import ReservationPage from "../Reservation/ReservationPage";

export default function CustomerLayout(props) {
    const { path } = useRouteMatch();

    return(
        <>
        <Header/>
        <div className="main-content">
            <Route path={`${path}/profile`} component={ProfilePage}/>
            <Route path={`${path}/promotion`} component={PromotionCouponPage}/>
            <Route path={`${path}/reservation`} component={ReservationPage}/>
        </div>
        <ChatPopup/>
        </>
    );
}