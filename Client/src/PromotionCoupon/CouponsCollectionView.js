import React from "react";
import GetCouponCardsAsync from "./Logics/GetCouponCards";

class CouponsCollectionView extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            coupons: [],
        };
    }

    async componentDidMount() {
        try{
            let couponCards = await GetCouponCardsAsync();
            this.setState({
                coupons: couponCards
            });
        }
        catch(err){
            console.log(err);
            let errMsg = err.message;
            alert(errMsg);
        }
    }
  
    componentWillUnmount() {

    }

    render() {
        return (
            <div className="container promotion-page-body">
                <div className="row">
                    <div className="col-md-12">
                        {this.state.coupons}
                    </div>
                </div>
            </div>
        );
    }
}

export default CouponsCollectionView;