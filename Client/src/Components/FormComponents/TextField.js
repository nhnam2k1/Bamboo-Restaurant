import React from "react";

export default class TextField extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const {
            id, 
            type,
            name,
            required,
            value,
            onChange,
            lbName,
            error,
            ...rest
        } = this.props;
        
        let newClassname = "form-control ";
        if (error) {
            newClassname = newClassname + "is-invalid";
        }
        return(
            <div className="form-group mb-3">
                {lbName && 
                <label className="form-label" htmlFor={id}>{lbName}&nbsp;</label>}
                <input className={newClassname} 
                        id={id} 
                        type={type} 
                        name={name} 
                        required={required}
                        value={value || ''} 
                        onChange={onChange}
                        {...rest} />
                <div className="invalid-feedback">
                    <small>{error}</small>    
                </div>
            </div>
        );
    }
}