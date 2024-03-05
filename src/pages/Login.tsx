import { ReactNode, useState } from "react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { LOGIN_Form } from "../data";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSchema } from "../validation";
import InputErrorMessage from "../components/ui/InputErrorMessage";
import axiosInstance from "../config/axios.config";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { IErrorResponse } from "../interfaces";



interface ILginInput {
  identifier:string,
  password:string
}
// eslint-disable-next-line react-hooks/rules-of-hooks


const LoginPage = () => {
  const [isLoading , setIsLoading] = useState(false)
  const { register, handleSubmit,formState:{errors} } = useForm<ILginInput>({
    resolver:yupResolver(LoginSchema)
  })
  // handler
  const onSubmit: SubmitHandler<ILginInput> = async data => {
    
    setIsLoading(true)
    try {
      const {status} = await axiosInstance.post("/auth/local",data);
      if (status === 200){
        toast.success("you will navigate to the home page after 4 second to login!",{
          position:"bottom-center",
          duration:4000,
          style:{
            backgroundColor:"black",
            color:"white",
            width:"fit-content",
            }
          
        })
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
      // render form 
  const renderlOGINrForm = LOGIN_Form.map(({name,placeholder,type,validation},idx):ReactNode=>{
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
      <h2 className="text-center mb-4 text-3xl font-semibold">Login to get access!</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {renderlOGINrForm}
          
        <Button fullWidth isLoading={isLoading}>Login</Button>
      </form>
    </div>
  );
};

export default LoginPage;
