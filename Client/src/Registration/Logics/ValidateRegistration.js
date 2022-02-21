import * as yup from 'yup';

import { UsernameSchema, PasswordSchema, ConfirmPasswordSchema } from "../../InputValidation/UsernamePasswordValidation";
import { EmailSchema, NameSchema, AddressSchema } from "../../InputValidation/InfoValidation";

const RegistrationSchema = yup.object({
    name : NameSchema,
    email : EmailSchema,
    address : AddressSchema,
    username: UsernameSchema,
    password: PasswordSchema,
    confirmPassword: ConfirmPasswordSchema('password')
});

export default async function ValidateRegistrationAysnc(data){
    try{
        await RegistrationSchema.validate(data, { abortEarly: false });
        return true;
    }
    catch(err){
        let listErrors = {};
        err.inner.forEach(e => {
            listErrors[e.path] = e.message;
        });
        throw new Error(JSON.stringify(listErrors));
    }
}