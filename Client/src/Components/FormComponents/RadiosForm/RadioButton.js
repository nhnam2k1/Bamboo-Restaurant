import React from "react";

export default class RadioButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const{
            id,
            name,
            value,
            checked,
            onChange,
            ...rests
        } = this.props;

        return(
            <div className="form-check">
                <input className="form-check-input" 
                        type="radio" 
                        id={id} 
                        name={name}
                        value={value}
                        checked={checked}
                        onChange={onChange}/>
                <label className="form-check-label" htmlFor={id}>{value}&nbsp;</label>
            </div>
        );
    }
}