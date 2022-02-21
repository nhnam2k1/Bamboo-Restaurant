import {GetReservationsAsync} from "../Adapters/ReservationAdapters";
import ReservationCard from "../ReservationCard";

function CheckFilterConditions(detail, condition) {
    
    if (condition == null) return true; // No conditions means pass
    let date = new Date(detail.date);

    if (condition.hasOwnProperty('startDate') && condition.startDate !== "") {
        let startDateCondition = new Date(condition.startDate);
        if (date < startDateCondition) return false;
    }

    if (condition.hasOwnProperty('endDate') && condition.endDate !== "") {
        let endDateCondition = new Date(condition.endDate);
        if (date > endDateCondition) return false;
    }

    return true;
}

async function GetReservationCardsAsync(condition, callbacks) {
    let data = await GetReservationsAsync();
    let {handleUpdate, handleRemove} = callbacks;

    const listOfReservationCards = data.map((detail) =>{
        if (CheckFilterConditions(detail, condition) === true){
            let allergies = detail.allergies ? detail.allergies : "No";
            detail.allergies = allergies;
            
            return <ReservationCard key={detail.id}
                                    onUpdate={handleUpdate}
                                    onRemove={handleRemove}
                                    {...detail}
                                    />
        }
    });
    return listOfReservationCards;
}

export default GetReservationCardsAsync;
