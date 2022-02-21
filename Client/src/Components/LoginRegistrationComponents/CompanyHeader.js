import React from "react";

export default class CompanyHeader extends React.Component{
    render() {
        return (
            <h3 className="text-info fw-light company-name">
                <i className="icon ion-android-restaurant"></i>
                &nbsp;Bamboo Restaurant
            </h3>
        );
    }
}