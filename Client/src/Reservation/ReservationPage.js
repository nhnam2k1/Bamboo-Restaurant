import React from 'react';

import ReservationFilterBar from "./ReservationFilterBar";
import ReservationCardsCollectionView from "./ReservationCardsCollectionView";

class ReservationPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            filterData: null
        };
        this.handleFilter = this.handleFilter.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.reservationCardsCollectionView = React.createRef();
    }
    
    async componentDidMount() {
        
    }
  
    componentWillUnmount() {
    }

    handleFilter(filterData){
        this.setState({
            filterData : filterData
        });
    }

    handleCreate(data){
        this.reservationCardsCollectionView
        .current
        .handleCreate(data);
    }

    render(){
        return (
            <>
            <ReservationFilterBar handleFilter={this.handleFilter} 
                                  onCreate={this.handleCreate}/>
            <ReservationCardsCollectionView filter={this.state.filterData} 
                                            ref={this.reservationCardsCollectionView}/>
            </>
        );
    }
}

export default ReservationPage;