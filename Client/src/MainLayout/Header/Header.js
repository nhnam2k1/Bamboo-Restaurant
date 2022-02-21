import React from "react";
import { Link, withRouter } from "react-router-dom";

class Header extends React.Component{
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        
    }
  
    componentWillUnmount() {

    }

    render(){
        let url = this.props.match.url;
        
        return (
            <div className="dark-navbar">
                <nav className="navbar navbar-light navbar-expand-md sticky-top navigation-clean-button" styles="height:80px">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/profile"><i className="icon ion-android-restaurant"></i>&nbsp;Bamboo Restaurant</Link>
                        <button data-bs-toggle="collapse" className="navbar-toggler" data-bs-target="#navcol-1">
                            <span className="visually-hidden">Toggle navigation</span>
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navcol-1">
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item">
                                    <Link className="nav-link active" styles="color:#ffffff;" to={`${url}/profile`}>
                                        <i className="fa fa-home"></i>&nbsp;Home
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" styles="color:#ffffff;" to={`${url}/reservation`}>
                                        <i className="fa fa-wpexplorer"></i>&nbsp;Reservation
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" styles="color:#ffffff;" to={`${url}/promotion`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none">
                                    <path d="M11 3H13V21H11V3Z" fill="currentColor"></path>
                                    <path d="M5 8C5 7.44771 5.44772 7 6 7H9V5H6C4.34315 5 3 6.34315 3 8V16C3 17.6569 4.34315 19 6 19H9V17H6C5.44772 17 5 16.5523 5 16V8Z" fill="currentColor"></path>
                                    <path d="M19 8C19 7.44771 18.5523 7 18 7H15V5H18C19.6569 5 21 6.34315 21 8V16C21 17.6569 19.6569 19 18 19H15V17H18C18.5523 17 19 16.5523 19 16V8Z" fill="currentColor"></path>
                                    </svg>
                                    &nbsp;Promotion
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" styles="color:#ffffff;" to={`${url}/profile`}>
                                        <i className="fa fa-user-circle-o"></i>
                                        &nbsp;Profile
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" styles="color:#ffffff;" to="/logout">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none">
                                        <path d="M8.51428 20H4.51428C3.40971 20 2.51428 19.1046 2.51428 18V6C2.51428 4.89543 3.40971 4 4.51428 4H8.51428V6H4.51428V18H8.51428V20Z" fill="currentColor"></path>
                                        <path d="M13.8418 17.385L15.262 15.9768L11.3428 12.0242L20.4857 12.0242C21.038 12.0242 21.4857 11.5765 21.4857 11.0242C21.4857 10.4719 21.038 10.0242 20.4857 10.0242L11.3236 10.0242L15.304 6.0774L13.8958 4.6572L7.5049 10.9941L13.8418 17.385Z" fill="currentColor"></path>
                                    </svg>
                                    &nbsp;Logout
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

export default withRouter(Header);