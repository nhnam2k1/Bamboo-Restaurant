import * as yup from 'yup';

import { UsernameSchema, PasswordSchema } from "../../InputValidation/UsernamePasswordValidation";

const UsernamePasswordSchema = yup.object({
    username: UsernameSchema,
    password: PasswordSchema
});

export default async function ValidateCrendential(data){
    await UsernamePasswordSchema
        .validate(data, { abortEarly: false })
        .catch((err) => {
            let listErrors = {};
            err.inner.forEach(e => {
                listErrors[e.path] = e.message;
            });
            throw new Error(JSON.stringify(listErrors));
    });
}