import {SubmitHandler, useForm} from "react-hook-form";
import {Input} from "../../input/standard";
import {loginSchema, TloginForm} from "./schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {useContext} from "react";
import {Link} from "react-router-dom";
import {ClientContext} from "../../../providers/clientContext";

export function LoginModal() {
  const {login} = useContext(ClientContext);

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<TloginForm>({resolver: zodResolver(loginSchema)});

  const submit: SubmitHandler<TloginForm> = async (formData) => {
    console.log(formData);
    login(formData);
  };

  const error = null;
  return (
    <form onSubmit={handleSubmit(submit)} className="m-8 flex flex-col items-center">
      <Input
        label={"Email: "}
        id={"login-email"}
        type={"text"}
        placeholder="Digite aqui seu email"
        error={errors.email}
        className="w-64 rounded-md h-8"
        inputWidth="w-80"
        {...register("email")}
      />

      <Input
        label={"Senha: "}
        id={"login-password"}
        type={"password"}
        placeholder="Digite aqui sua senha"
        error={errors.password}
        className="w-64 rounded-md h-8"
        inputWidth="w-80"
        {...register("password")}
      />
      {error ? <p>error.message</p> : <p></p>}
      <button type="submit" className="w-80 h-8 bg-blue-500 rounded-xl text-zinc-200">
        Entrar
      </button>

      <p className="mt-6">
        Ainda não tem uma conta,{" "}
        <Link to="/registerclient" className="text-blue-800 hover:text-blue-600">
          clique aqui
        </Link>
      </p>
    </form>
  );
}
