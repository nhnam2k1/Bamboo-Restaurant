import React from "react";
import ReservationCreateForm from "./ReservationCreateForm";

class ReservationFilterBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFormShown: false,
        };

        this.handleShowForm = this.handleShowForm.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }

    handleShowForm(event) {
        this.setState(prevState => ({
            isFormShown: !prevState.isFormShown
        }));
    }

    handleSearch(event) {
        event.preventDefault();
        this.props.handleFilter(this.state);
    }

    handleSubmit(data) {
        this.handleShowForm(null);
        this.props.onCreate(data);
    }
    
    render() {
        return (
            <>
            <div className="container reservation-page-header">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <label className="form-label">From&nbsp;&nbsp;</label>
                            <input id="search-start-date" type="date" name="startDate" 
                                   value={this.state.startDate} onChange={this.handleInputChange}/>
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">To&nbsp;&nbsp;</label>
                            <input id="search-end-date" type="date" name="endDate" 
                                   value={this.state.endDate} onChange={this.handleInputChange}/>
                        </div>
                        <div className="col-md-3">
                            <input type="search" id="search-input" placeholder="search reservation"
                                   name="pattern" value={this.state.pattern} onChange={this.handleInputChange}/>
                        </div>
                        <div className="col-md-3">
                            <div className="btn-group" role="group">
                                <button className="btn btn-primary" type="button" 
                                        onClick={this.handleSearch}>
                                            Search
                                </button>
                                <button className="btn btn-info" type="button"
                                        onClick={this.handleShowForm}>
                                    Create New Reservation
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {this.state.isFormShown && 
            <ReservationCreateForm handleShowForm={this.handleShowForm}
                                   onSubmit={this.handleSubmit}/>}
            </>
        );
    }
}

export default ReservationFilterBar;