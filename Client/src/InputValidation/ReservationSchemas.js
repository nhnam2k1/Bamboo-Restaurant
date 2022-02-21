import * as yup from 'yup';

const PeopleInReservationSchema = yup
.number("The number of people must be a number")
.required("The number of people must be present")
.min(2, "The number of people in reservation must be greater than or equal to 2")
.max(8, "The number of people must be less than or equal to 8");

export {
    PeopleInReservationSchema
}