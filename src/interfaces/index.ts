export interface IRegisterInput{
    name:"username" | "Email" | "password",
    placeholder:string,
    type:string,
    validation:{
        required?:boolean,
        minLength?:number,
        pattern?:RegExp
    }
}