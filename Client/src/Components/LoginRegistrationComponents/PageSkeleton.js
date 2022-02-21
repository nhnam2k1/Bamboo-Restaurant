import React from "react";

import BackImageComponent from "./BackImageComponent";
import CompanyHeader from "./CompanyHeader";

export default class PageSkeleton extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="container-fluid">
                <div className="row mh-100vh">
                    <div className="col-10 col-sm-8 col-md-6 col-lg-6 offset-1 
                                    offset-sm-2 offset-md-3 offset-lg-0 
                                    align-self-center d-lg-flex align-items-lg-center align-self-lg-stretch 
                                    bg-white p-4 rounded rounded-lg-0 my-5 my-lg-0" 
                        id="login-block">
                        <div className="m-auto w-lg-75 w-xl-50">
                            <CompanyHeader/>
                            {this.props.children}
                        </div>
                    </div>
                    <BackImageComponent/>
                </div>
            </div>
        )
    }
}