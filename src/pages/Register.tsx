import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useForm, SubmitHandler } from "react-hook-form"
import InputErrorMessage from "../components/ui/InputErrorMessage";
interface IFormInput {
  username: string,
  Email:string,
  password:string
}
const RegisterPage = () => {
    const { register, handleSubmit,formState:{errors} } = useForm<IFormInput>()
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data)
  
  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-center mb-4 text-3xl font-semibold">Register to get access!</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
        <Input {...register("username",
        {required:true,
        minLength:5,
        })} 
        placeholder="Username" />
        {errors?.username && errors.username.type === "required" && <InputErrorMessage msg="Username is required"/> }
        {errors?.username && errors.username.type === "minLength" && <InputErrorMessage msg="Username should be at-least 5 characters."/> }
        </div>
        <div>
        <Input {...register("Email",
        {required:true,
        pattern:/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
        })} placeholder="Email address" 
        />
        {errors?.Email && errors.Email.type === "required" && <InputErrorMessage msg="Email is required"/> }
        {errors?.Email && errors.Email.type === "minLength" && <InputErrorMessage msg="Not valid email."/> }
        </div>
        <div>
        <Input {...register("password",
        {required:true,
        minLength:5,
        })} placeholder="Password" />
        {errors?.password && errors.password.type === "required" && <InputErrorMessage msg="password is required"/> }
        {errors?.password && errors.password.type === "minLength" && <InputErrorMessage msg="password should be at-least 6 characters."/> }
        </div>
        <Button fullWidth>Register</Button>
      </form>
    </div>
  );
};

export default RegisterPage;
