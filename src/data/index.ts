import { IRegisterInput } from "../interfaces";

export const REGISTER_FORM:IRegisterInput[] = [
    {
        name:"username",
        placeholder:"username",
        type:"text",
        validation:{
            required:true,
            minLength:5
        }
    },
    {
        name:"email",
        placeholder:"email",
        type:"text",
        validation:{
            required:true,
            pattern:/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/
        }
    },
    {
        name:"password",
        placeholder:"password",
        type:"password",
        validation:{
            required:true,
            minLength:5
        }
    }
]