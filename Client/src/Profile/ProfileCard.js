import React from "react";
import GetUserDetailAsync from "./Logics/GetUserDetail";

class ProfileCard extends React.Component{
    // Params: (name, email, address, created_at)
    constructor(props) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {
        try{
            let profileData = await GetUserDetailAsync();
            this.setState(profileData);
        }
        catch(err){
            let errMsg = err.message;
            alert(errMsg);
        }
    }
  
    componentWillUnmount() {

    }

    render(){
        const {name, email, address, role, createAt} = this.state;

        return (
            <div className="col-md-6 profile-card-area">
                <div className="profile-image-content">
                    <img className="profile-avatar" src="assets/img/Hash_Code_2021.png" />
                </div>
                <div>
                    <h4>{name}</h4>
                    <h6>{email}</h6>
                </div>
                <div>
                    <p>{address}</p>
                    <p>Member since {createAt}</p>
                </div>
            </div>
        );
    }
}

export default ProfileCard;