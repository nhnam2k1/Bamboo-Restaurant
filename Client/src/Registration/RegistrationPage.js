import React from "react";
import { Link, withRouter } from "react-router-dom";

import TextField from "../Components/FormComponents/TextField";
import PageSkeleton from "../Components/LoginRegistrationComponents/PageSkeleton";

import HandleRegistrationAsync from "./Logics/HandleRegistration";

class RegistrationPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            errors : {}
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({ [name]: value});
    }

    async handleSubmit(event) {
        try{
            event.preventDefault();
            let data = await HandleRegistrationAsync(this.state);
            alert("Successful registration");
            this.props.history.push("/login");
        }
        catch(err){
            let error = JSON.parse(err.message);
            const {status} = error;
            if (status !== undefined){
                // This is a message
                this.setState({ 
                    errors:{
                        username : error
                    }
                });
                return true;
            }
            let listError = error;
            this.setState({ errors : listError });
        }
    }

    render() {
        return(
            <PageSkeleton>
                <form onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="col-md-6">
                            <TextField  type="text" required
                            placeholder="First Name..." 
                            name="firstName"
                            value={this.state.firstName}
                            error={this.state.errors.firstName}
                            inputMode="latin-name"
                            onChange={this.handleInputChange}/>
                        </div>
                        <div className="col-md-6">
                            <TextField type="text" required
                            placeholder="Last Name..." 
                            name="lastName"
                            value={this.state.lastName}
                            error={this.state.errors.lastName}
                            inputMode="latin-name"
                            onChange={this.handleInputChange}/>
                        </div>
                    </div>
                    <TextField type="text" required
                        placeholder="Your Email..." 
                        name="email"
                        value={this.state.email}
                        error={this.state.errors.email}
                        inputMode="email"
                        onChange={this.handleInputChange}/>
                    <TextField type="text" required
                        name="address"
                        value={this.state.address}
                        error={this.state.errors.address}
                        placeholder="Your Address..." 
                        onChange={this.handleInputChange}/>
                    <TextField type="text" required 
                        name="username"
                        value={this.state.username}
                        error={this.state.errors.username}
                        placeholder="Your Username..."
                        onChange={this.handleInputChange}/>
                    <TextField type="password" required
                        name="password"
                        value={this.state.password}
                        error={this.state.errors.password}
                        placeholder="Your Password..."
                        onChange={this.handleInputChange}/>
                    <TextField type="password" required
                        name="confirmPassword"
                        value={this.state.confirmPassword}
                        error={this.state.errors.confirmPassword}
                        placeholder="Confirm Password..."
                        onChange={this.handleInputChange}/>
                    <button className="btn btn-primary mt-2" type="submit">Register</button>
                </form>
                <p className="mt-3 mb-0">
                    <Link className="text-info small" to="/login">Already have account ? Login here</Link>
                </p>
            </PageSkeleton>
        )
    }
}

export default withRouter(RegistrationPage);