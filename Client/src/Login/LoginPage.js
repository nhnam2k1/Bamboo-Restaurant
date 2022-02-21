import React from "react";
import { Link, withRouter } from "react-router-dom";

import CheckLoginAsync from "./Logics/CheckLogin";
import TextField from "../Components/FormComponents/TextField";
import PageSkeleton from "../Components/LoginRegistrationComponents/PageSkeleton";

class LoginPage extends React.Component{
    constructor(props){
        super(props);
        this.state = { errors : {} };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({ [name]: value });
    }

    async handleSubmit(event) {
        try{
            event.preventDefault();
            let data = await CheckLoginAsync(this.state);
            this.props.history.push("/customer/profile");
        }
        catch(err){
            let error = JSON.parse(err.message);
            const {status} = error;
            if (status === 401) {
                this.setState({
                    password: "",
                    errors: {
                        username: null,
                        password: "Wrong username/password, please try again !"
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
                    <TextField type="text" required 
                        placeholder="Your Username..."
                        name="username"
                        value={this.state.username}
                        error={this.state.errors.username}
                        onChange={this.handleInputChange}/>
                    <TextField type="password" required
                        placeholder="Your Password..."
                        name="password"
                        value={this.state.password}
                        error={this.state.errors.password}
                        onChange={this.handleInputChange}/>
                    <button className="btn btn-info mt-2" type="submit">Log In</button>
                </form>
                <p className="mt-3 mb-0">
                    <Link className="text-info small" to="/registration">Did not have account ? Register here</Link>
                </p>
            </PageSkeleton>
        )
    }
}

export default withRouter(LoginPage);