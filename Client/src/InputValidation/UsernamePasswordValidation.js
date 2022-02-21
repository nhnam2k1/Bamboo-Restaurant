import * as yup from 'yup';

const UsernameSchema = yup
.string()
.required("Please type your username")
.min(8, "The username must consists at least 8 characters")
.max(15, "The username must consists at most 15 characters");


const PasswordSchema = yup
.string()
.required("Please type your password")
.min(8, "The password must consist at least 8 characters")
.max(15, "The password must consist at most 15 characters");

const ConfirmPasswordSchema = (reference) => {
    return yup.string()
            .oneOf([yup.ref(reference), null], 'Passwords must match');
}

export {
    UsernameSchema,
    PasswordSchema, 
    ConfirmPasswordSchema
}