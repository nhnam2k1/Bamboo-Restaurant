import * as yup from 'yup';

const DateScheme = yup
.date()
.required("Please type the date")
.min(new Date(), "Date should not in the past");

export default DateScheme;