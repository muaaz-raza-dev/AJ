import { LoginPayload } from "@/Api/Auth/Login.api";
import RequestLoading from "@/Global/Loaders/RequestLoding";
import useLogin from "@/Hooks/Auth/useLogin";
import { Lock, Mail } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";

const LoginForm = () => {
  const {register,formState: { errors },handleSubmit,} = useForm<LoginPayload>();
  const {isLoading,mutate} = useLogin()
  const FormHandler:SubmitHandler<LoginPayload> = (data) => {
    mutate(data)
  };


  return (
    <form
      className="md:w-[80%] overflow-hidden max-md:w-[95%] flex flex-col justify-center gap-y-8"
      onSubmit={handleSubmit(FormHandler)}
    >
        <div className="">
      <div className="flex gap-x-1 overflow-hidden !rounded-lg GlassBackgroundLogin px-2 py-4  items-center w-full ">

        <div className="rounded-full center p-2 bg-white">
          <Mail className="text-[var(--dark)]" />
        </div>
        <input
          {...register("usernameOrEmail", {
            required: "Email or username is required",
          })}
          placeholder="username or email "
          className="!bg-transparent w-full text-lg  p-2 placeholder:text-gray-200 text-white font-medium  ring-0 outline-0 border-0 focus:outline-0 active:outline-0 focus-visible:ring-0"
        />
      </div>
        {errors.usernameOrEmail && (
          <span className="text-red-300 px-2 text-xs">{errors.usernameOrEmail.message}</span>
          )}
          </div>
          <div className="">

      <div className="flex items-center !rounded-lg GlassBackgroundLogin px-2 py-4  gap-x-1 ">
        <div className="rounded-full center p-2 bg-white">
          <Lock className="text-[var(--dark)]" />
        </div>
        <input
          {...register("password", { required: "password is required" })}
          placeholder="Password"
          type="password"
          className="!bg-transparent w-full text-lg p-2 placeholder:text-gray-200 text-white font-medium  ring-0 outline-0 border-0 focus:outline-0 active:outline-0 focus-visible:ring-0"
        />
      </div>
        {errors.password && (
          <p className="text-red-300 px-2 text-xs ">{errors.password.message}</p>
       )}
      </div>

      <button disabled={isLoading} className="w-full bg-[var(--dark)] py-4 text-xl !rounded-lg text-white active:scale-95 transition-transform font-bold hFont">
        {
          isLoading?
          <RequestLoading/>:
          "Login"
        }
      </button>
    </form>
  );
};

export default LoginForm;
