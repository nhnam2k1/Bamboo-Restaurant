import { useRouteMatch, Link } from "react-router-dom";

export default function ContactCard(props) {
    const path = useRouteMatch().path;
    const {name, id, time} = props;

    return(
        <Link to={`${path}/${id}`}>
            <li className="d-flex align-items-end align-items-xl-end chat-customer-card">  
                <img className="img-fluid rounded-circle float-start chat-customer-avatar" 
                    src="/assets/img/Hash_Code_2021.png"/>
                <div className="align-self-center chat-customer-message-notification">
                    <h6>{name}</h6>
                    <small>Someone is messaging...</small>
                    <small className="float-end">{time}</small>
                </div>
            </li>
        </Link>  
    );
}