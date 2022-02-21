import React from "react";
import { withRouter } from 'react-router-dom';

import RemoveReservationAsync from "./Logics/RemoveReservation";

class ReservationCard extends React.Component{
    // Params (id, date, startTime, endTime, numberPeople, 
    //         description, allergies, tableChoice)
    constructor(props) {
        super(props);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }
    
    async handleEdit(event) {
        try{
            event.preventDefault();
            let id = this.props.id;
            //let msg = await RemoveReservationAsync(id);
            //this.props.history.push("/reservation");
        }
        catch(err){
            alert(err.message);
        }
    }

    async handleRemove(event) {
        try{
            event.preventDefault();
            let id = this.props.id;
            let msg = await RemoveReservationAsync(id);
            this.props.onRemove(id);
        }
        catch(err){
            alert(err.message);
        }
    }

    componentDidMount() {

    }
  
    componentWillUnmount() {

    }

    render(){
        return (
            <div className="card reservation">
                <div className="card-body">
                    <div className="row">
                        <div className="col reservation-detail">
                            <h4>Reservation</h4>
                            <div className="row">
                                <div className="col">
                                    <h6 className="text-muted mb-2">Date:&nbsp;{this.props.date}</h6>
                                </div>
                                <div className="col">
                                    <h6 className="text-muted mb-2">Time:&nbsp;{this.props.startTime}-{this.props.endTime}</h6>
                                </div>
                            </div>
                            <h6 className="text-muted mb-2">
                                Description:&nbsp;&nbsp;This booking will have {this.props.numberPeople} people in a table. 
                                {this.props.description}<br/>
                            </h6>
                            <h6 className="text-muted mb-2">
                                Allergies:&nbsp;{this.props.allergies}<br/>
                            </h6>
                            <h6 className="text-muted mb-2">
                                Preferred Table:&nbsp;{this.props.tableChoice}<br/>
                            </h6>
                        </div>
                        <div className="col reservation-buttons">
                            <div className="btn-group" role="group">
                                <button className="btn btn-primary" type="button" onClick={this.handleEdit}>Edit</button>
                                <button className="btn btn-danger" type="button" onClick={this.handleRemove}>Remove</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(ReservationCard);