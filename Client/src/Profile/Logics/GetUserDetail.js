import {  GetProfileDataAsync } from '../Adapters/ProfileAdapter';

export default async function GetUserDetailAsync(){
    let data = await GetProfileDataAsync();
    let {createAt} = data;
    createAt = convertSqlDateToDate(createAt);
    data.createAt = createAt;
    return data;
}

function convertSqlDateToDate(sqlDate){
    let date = new Date(sqlDate);
    let localDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    return localDate;
}