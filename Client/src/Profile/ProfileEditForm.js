import React from "react";
import UpdateUserDetailsAsync from "./Logics/UpdateUserDetail";

class ProfileEditForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {content: null};
        
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        
    }
  
    componentWillUnmount() {

    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }

    async handleSubmit(event) {
        try{
            event.preventDefault();
            let {  fname, lname, 
                   address, email, 
                   city, postcode, country } = this.state;
            let data = { fname, lname, 
                        address, email, 
                        city, postcode, country };
            await UpdateUserDetailsAsync(data);
            this.setState({});
        }
        catch(err){
            alert(err.message);
        }
    }

    render(){
        return (
            <div className="col-md-6 edit-profile-area">
                <form onSubmit={this.handleSubmit}>
                    <h3>EDIT YOUR PROFILE</h3>
                    <div className="edit-info-content">
                        <h6>User information</h6>
                        <div className="row">
                            <div className="col">
                                <label className="form-label">First Name</label>
                                <input className="form-control" type="text" name="fname" required
                                    value={this.state.fname} 
                                    onChange={this.handleInputChange}/>
                            </div>
                            <div className="col">
                                <label className="form-label">Last Name</label>
                                <input className="form-control" type="text" name="lname" required
                                    value={this.state.lname} 
                                    onChange={this.handleInputChange}/>
                            </div>
                        </div>
                    </div>
                    <div className="edit-info-content">
                        <h6>Contact Information</h6>
                        <div className="row">
                            <div className="col">
                                <label className="form-label">Address</label>
                                <input className="form-control" type="text" name="address" required
                                    value={this.state.address} 
                                    onChange={this.handleInputChange}/>
                            </div>
                            <div className="col">
                                <label className="form-label">Email</label>
                                <input className="form-control" type="text" name="email" required
                                    value={this.state.email}  
                                    onChange={this.handleInputChange}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <label className="col-form-label">City
                                    <input className="form-control" type="tel" name="city" required
                                        value={this.state.city} 
                                        onChange={this.handleInputChange}/>
                                </label>
                            </div>
                            <div className="col">
                                <label className="col-form-label">
                                    Postcode<br/>
                                    <input className="form-control" type="text" name="postcode" required
                                        value={this.state.postcode} 
                                        onChange={this.handleInputChange}/>
                                </label>
                            </div>
                            <div className="col">
                                <label className="col-form-label">Country<br/>
                                    <input className="form-control" type="tel" name="country" required
                                        value={this.state.country} 
                                        onChange={this.handleInputChange}/>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="edit-info-content">
                        <button className="btn btn-primary" type="submit">Update</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default ProfileEditForm;