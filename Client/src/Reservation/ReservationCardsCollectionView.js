import React from "react";
import GetReservationCardsAsync from "./Logics/GetReservation";

var isEqual = require('lodash.isequal');

class ReservationCardsCollectionView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reservationsCollection: [],                                             
        };
        this.handleCreate = this.handleCreate.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.GetReservationList = this.GetReservationList.bind(this);
    }

    async GetReservationList(){
        let {filter} = this.props;
        let {handleCreate, handleUpdate, handleRemove} = this;
        let callbackHandlers = {handleCreate, handleUpdate, handleRemove};
        let reservationsCollection = await GetReservationCardsAsync(filter, callbackHandlers);
        return reservationsCollection;
    }

    async componentDidMount() {
        try{
            let reservationsCollection = await this.GetReservationList();
            this.setState({
                reservationsCollection: reservationsCollection
            });
        }
        catch(err){
            alert(err.message);
        }
    }

    async componentDidUpdate(prevProps){
        let {filter} = this.props;
        if (isEqual(prevProps.filter, filter)) return; // No update

        let reservationsCollection = await this.GetReservationList();

        this.setState({
            reservationsCollection: reservationsCollection
        });
    }

    componentWillUnmount(){

    }

    // Handle will only in the component scope
    async handleCreate(data){
        try{
            let newReservationsList = await this.GetReservationList();
            this.setState({
                reservationsCollection: newReservationsList
            });
        }
        catch(err){
            alert(err.message);  
        }
    }

    async handleUpdate(data){
        try{
            let newReservationsList = await this.GetReservationList();
            this.setState({
                reservationsCollection: newReservationsList
            });
        }
        catch(err){
            alert(err.message);   
        }
    }

    async handleRemove(data){
        try{
            let newReservationsList = await this.GetReservationList();
            this.setState({
                reservationsCollection: newReservationsList
            });
        }
        catch(err){
            alert(err.message);  
        }
    }

    render() {
        return (
            <div className="container reservation-page-body">
                {this.state.reservationsCollection}
            </div>
        );
    }
}

export default ReservationCardsCollectionView;

/*
static getDerivedStateFromProps(nextProps, prevState) {
    // Should not use async in this event
    if (isEqual(prevState.filter, nextProps.filter)){
        console.log("No update");
        return null; // No update
    } 
    console.log("New update");
    console.log(JSON.stringify(prevState.filter));
    console.log(JSON.stringify(nextProps.filter));
    
    //let reservationsCollection = await ConvertToReservationCards(nextProps.filter);
    let reservationsCollection = [];
    console.log(reservationsCollection.length);

    return {
        filter: nextProps.filter,
        reservationsCollection: reservationsCollection
    };
}*/