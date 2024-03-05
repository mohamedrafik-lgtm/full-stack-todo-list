import * as yup from "yup"

export const registerSchema = yup
    .object({
        username: yup.string().required("username is required!").min(5,"username shluld be at least 5 characters."),
        email:yup.string().required("Email is required").matches(/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,"Not a valid email  address."),
        password:yup.string().required("password is required").min(6,"password shluld be at least 6 characters.")
    })
.required()

export const LoginSchema = yup
    .object({
        identifier:yup.string()
        .required("Email is required")
        .matches(/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,"Not a valid email  address."),
        password:yup.string().required("password is required").min(6,"password shluld be at least 6 characters.")
    })
.required()