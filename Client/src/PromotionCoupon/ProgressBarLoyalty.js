import React from "react";

class ProgressBarLoyalty extends React.Component{
    // Params (currentValue, targetValue)
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.currentValue / this.props.targetValue * 100
        };
    }

    componentDidMount() {
        
    }
  
    componentWillUnmount() {

    }

    render(){
        const currentProgressBar = {
            width: this.state.value + '%',
        };
        return (
            <div className="container promotion-page-header">
                <div className="row">
                    <div className="col-md-12 progress-bar-area">
                        <h3>Goal for Spending</h3>
                        <div className="progress">
                            <div className="progress-bar bg-info progress-bar-striped progress-bar-animated" 
                            aria-valuenow={this.state.value} 
                            aria-valuemin="0" 
                            aria-valuemax="100" 
                            style={currentProgressBar}>
                                {this.props.currentValue} / {this.props.targetValue}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProgressBarLoyalty;