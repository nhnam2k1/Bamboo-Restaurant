import React from "react";

import ProgressBarLoyalty from "./ProgressBarLoyalty";
import CouponsCollectionView from "./CouponsCollectionView";

class PromotionCouponPage extends React.Component{
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        
    }
  
    componentWillUnmount() {

    }

    render(){
        return (
            <div className="promotion-page">
                <ProgressBarLoyalty currentValue={100} targetValue={150}/>
                <CouponsCollectionView/>
            </div>
        );
    }
}

export default PromotionCouponPage;