import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useForm, SubmitHandler } from "react-hook-form"
import InputErrorMessage from "../components/ui/InputErrorMessage";
import { REGISTER_FORM } from "../data";
import { ReactNode } from "react";
import { yupResolver } from "@hookform/resolvers/yup"
import { registerSchema } from "../validation";
interface IFormInput {
  username: string,
  Email:string,
  password:string
}
const RegisterPage = () => {
    const { register, handleSubmit,formState:{errors} } = useForm<IFormInput>({
      resolver:yupResolver(registerSchema)
    })
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data)


  // renders
  const renderRegisterForm = REGISTER_FORM.map(({name,placeholder,type,validation},idx):ReactNode=>{
    return <div key={idx}>
      <Input {...register(name, validation)}
        type={type}
        placeholder={placeholder} />
      {errors[name] && <InputErrorMessage msg={errors[name]?.message} />}
    </div>;
  })
  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-center mb-4 text-3xl font-semibold">Register to get access!</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {renderRegisterForm}
        <Button fullWidth>Register</Button>
      </form>
    </div>
  );
};

export default RegisterPage;
