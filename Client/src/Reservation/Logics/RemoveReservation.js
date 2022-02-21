import {DeleteReservationAsync} from "../Adapters/ReservationAdapters";

export default async function RemoveReservationAsync(id){
    let msg = await DeleteReservationAsync(id);
    return msg;
}
