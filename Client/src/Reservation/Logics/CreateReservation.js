import * as yup from 'yup';
import {PostNewReservationAsync} from "../Adapters/ReservationAdapters";

import DateScheme from "../../InputValidation/DateSchema";
import {PeopleInReservationSchema} from "../../InputValidation/ReservationSchemas";

const ReservationSchema = yup.object({
    date: DateScheme,
    numberPeople: PeopleInReservationSchema
});

function GetSqlStartTime(time){
    return `${time}:00`;
}

function GetSqlEndTime(time){
    let h1 = parseInt(time[0])*10;
    let h2 = parseInt(time[1]);
    let hour = (h1 + h2 + 1) % 24;
    let c1 = String.fromCharCode(48 + (hour / 10));
    let c2 = String.fromCharCode(48 + (hour % 10));
    let minuteSecond = time.substr(time.indexOf(':'));
    let ans = `${c1+c2}${minuteSecond}`;
    return ans;
}

function ModifyData(data){
    let modifiedData = data;
    let startTime = modifiedData.startTime;
    startTime = GetSqlStartTime(startTime);
    let endTime = GetSqlEndTime(startTime);
    modifiedData.startTime = startTime;
    modifiedData.endTime = endTime;
    return modifiedData;
}

async function CreateReservationAsync(data){
    await ReservationSchema
        .validate(data, { abortEarly: false })
        .catch((err) => {
            let listErrors = {};
            err.inner.forEach(e => {
                listErrors[e.path] = e.message;
            });
            throw new Error(JSON.stringify(listErrors));
    });
    let dataModified = ModifyData(data);
    let response = await PostNewReservationAsync(dataModified);
    return response.data;
}

export default CreateReservationAsync;