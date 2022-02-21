import React from "react";
import axios from "axios";

import ProfileCard from "./ProfileCard";
import ProfileEditForm from "./ProfileEditForm";

class ProfilePage extends React.Component{
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
            <div className="profile-page">
                <div className="container">
                    <div className="row">
                        <ProfileCard/>
                        <ProfileEditForm/>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfilePage;