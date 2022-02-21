import React from "react";
import CreateReservationAsync from "./Logics/CreateReservation";

import TextField from "../Components/FormComponents/TextField";
import RadioButton from "../Components/FormComponents/RadiosForm/RadioButton";

class ReservationCreateForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error : {}
        };
        this.handleInputChange = this.handleInputChange.bind(this);
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

    async handleSubmit(event) {
        try{
            event.preventDefault();
            let data = await CreateReservationAsync(this.state);
            this.props.onSubmit(data);
        }
        catch(err){
            let listError = JSON.parse(err.message);
            this.setState({
                error : listError
            });
        }
    }

    render() {
        return (
            <div className="modal show" role="dialog" tabIndex="-1" id="create-new-reservation-modal">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <form className="form-inline" onSubmit={this.handleSubmit}>
                            <div className="modal-header">
                                <h4 className="modal-title">Create New Reservation</h4>
                                <button type="button" className="btn-close" 
                                        onClick={this.props.handleShowForm}
                                        data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <TextField id="create-reservation-date"
                                           type="date" 
                                           lbName="Date"
                                           name="date" 
                                           required
                                           value={this.state.date} 
                                           onChange={this.handleInputChange}
                                           error={this.state.error.date}/>
                                <TextField id="startTime"
                                           type="time" 
                                           lbName="Time"
                                           name="startTime" 
                                           required
                                           value={this.state.startTime}
                                           onChange={this.handleInputChange}
                                           error={this.state.error.startTime}/>
                                <TextField id="nrPeople"
                                           type="text"
                                           placeholder="Number of People" 
                                           inputMode="numeric"
                                           name="numberPeople" 
                                           required
                                           value={this.state.numberPeople} 
                                           onChange={this.handleInputChange}
                                           error={this.state.error.numberPeople}/>
                                <TextField id="description"
                                           type="text"
                                           name="description" 
                                           required
                                           placeholder="Description"
                                           value={this.state.description}
                                           onChange={this.handleInputChange}
                                           error={this.state.error.description}/>
                                <TextField id="Allergies"
                                           type="text"
                                           name="allergies"
                                           placeholder="Allergies"
                                           value={this.state.allergies}
                                           onChange={this.handleInputChange}
                                           error={this.state.error.allergies}/>
                                <div className="form-group">
                                    <label className="form-label">Preferred Seat&nbsp; &nbsp;</label>
                                    <RadioButton id="outside-table" 
                                                name="tableChoice" 
                                                value="Outside" 
                                                checked={this.state.tableChoice === "Outside"}
                                                onChange={this.handleInputChange}/>
                                    <RadioButton id="near-windows" 
                                                name="tableChoice" 
                                                value="Near Windows" 
                                                checked={this.state.tableChoice === "Near Windows"}
                                                onChange={this.handleInputChange}/>
                                    <RadioButton id="aisle"
                                                name="tableChoice" 
                                                value="Aisle" 
                                                checked={this.state.tableChoice === "Aisle"}
                                                onChange={this.handleInputChange}/>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-warning" type="reset">Reset</button>
                                <button className="btn btn-success" type="submit">Make Reservation</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default ReservationCreateForm;