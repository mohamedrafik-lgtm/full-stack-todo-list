import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useForm, SubmitHandler } from "react-hook-form"
import InputErrorMessage from "../components/ui/InputErrorMessage";
import { REGISTER_FORM } from "../data";
import { ReactNode, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup"
import { registerSchema } from "../validation";
import axiosInstance from "../config/axios.config";
import toast from "react-hot-toast";
import {AxiosError } from "axios";
import { IErrorResponse } from "../interfaces";
interface IFormInput {
  username: string,
  email:string,
  password:string
}
const RegisterPage = () => {
    const [isLoading , setIsLoading] = useState(false)
    const { register, handleSubmit,formState:{errors} } = useForm<IFormInput>({
      resolver:yupResolver(registerSchema)
    })
  const onSubmit: SubmitHandler<IFormInput> = async data => {
    console.log(data)
    setIsLoading(true)
    try {
      const {status} =await axiosInstance.post("/auth/local/register",data);
      if (status === 200){
        toast.success("you will navigate to the page after 4 second to login!",{
          position:"bottom-center",
          duration:4000,
          style:{
            backgroundColor:"black",
            color:"white",
            width:"fit-content",
            }
        })
      }else{
        console.log("error")
      }
    } catch (error) {

      const errorOpj = error as AxiosError<IErrorResponse>
      
      toast.error(`${errorOpj.response?.data.error.message}`,{
        position:"bottom-center",
        duration:4000,
        
      })
    }finally{
      setIsLoading(false)
    }
  
  }


  // renders
  const renderRegisterForm = REGISTER_FORM.map(({name,placeholder,type,validation},idx):ReactNode=>{
    return <div key={idx}>
      <Input 
        type={type}
        placeholder={placeholder} 
      {...register(name, validation)}
      />
      {errors[name] && <InputErrorMessage msg={errors[name]?.message} />}
    </div>;
  })
  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-center mb-4 text-3xl font-semibold">Register to get access!</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {renderRegisterForm}
        <Button fullWidth isLoading={isLoading}>
        
          Register</Button>
      </form>
    </div>
  );
};

export default RegisterPage;
