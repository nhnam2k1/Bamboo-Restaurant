import PostRegistrationAsync from "../Adapters/PostRegistration";
import ValidateRegistrationAysnc from "./ValidateRegistration";

export default async function HandleRegistrationAsync(profile){
    const { 
        firstName,
        lastName,
        email,
        address,
        username,
        password,
        confirmPassword
    } = profile;

    let name = `${firstName} ${lastName}`;
    let extractedData = {name, email, address, username, password, confirmPassword};

    await ValidateRegistrationAysnc(extractedData);
    await PostRegistrationAsync(extractedData);
}