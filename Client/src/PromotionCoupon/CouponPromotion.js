import React from "react";

class CouponPromotion extends React.Component{
    // Params: (title, description, code, expire_at)
    constructor(props) {
        super(props);
        this.state = {content: null};
    }

    componentDidMount() {
        
    }
  
    componentWillUnmount() {

    }

    render(){
        return (
            <div className="coupon-card">
                <div className="container coupon-header">
                    <h2>Bamboo Coupon</h2>
                </div>
                <img className="img-fluid" src="assets/img/Hash_Code_2021.png"/>
                <div className="container coupon-body">
                    <h3>{this.props.title}</h3>
                    <p>{this.props.description}</p>
                </div>
                <div className="container coupon-footer">
                    <p>Code:&nbsp;<span className="promo">{this.props.code}</span></p>
                    <p className="expire">Expire: {this.props.expire_at}</p>
                </div>
            </div>
        );
    }
}

export default CouponPromotion;