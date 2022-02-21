import * as yup from 'yup';

const EmailSchema = yup.string()
                        .required("Email is missing")
                        .email("Please provide correct email format");

const NameSchema = yup.string()
                        .required('Name is required')
                        .min(2, 'Too Short!')
                        .max(50, 'Too Long!');
                        

const AddressSchema = yup.string()
                        .required('The address is required')
                        .min(2, 'Too Short!')
                        .max(100, 'Too Long!');

export {
    EmailSchema,
    NameSchema,
    AddressSchema,
}