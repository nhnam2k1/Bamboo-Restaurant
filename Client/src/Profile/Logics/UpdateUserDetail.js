import {  UpdateProfileDataAsync } from '../Adapters/ProfileAdapter';

export default async function UpdateUserDetailsAsync(data){
    let {   fname, lname, 
            address, email, 
            city, postcode, country } = data;
    // Should have checking here   
    let name = `${fname} ${lname}`;
    address = `${address}, ${city}, ${postcode}, ${country}`;
    data = { name, address, email };

    data = await UpdateProfileDataAsync(data);
    return data;
}