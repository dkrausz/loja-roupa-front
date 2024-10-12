import {SubmitHandler, useForm} from "react-hook-form";
import {Input} from "../../Input";
import {loginSchema, TloginForm} from "./schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {useEffect, useRef} from "react";
import {Link} from "react-router-dom";

interface ICartModalProps {
  SetShowLogintModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export function LoginModal({SetShowLogintModal}: ICartModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<TloginForm>({resolver: zodResolver(loginSchema)});

  const submit: SubmitHandler<TloginForm> = async (formData) => {
    console.log(formData);
  };

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!modalRef.current?.contains(event.target as Node)) {
        SetShowLogintModal(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        SetShowLogintModal(false);
      }
    };

    window.addEventListener("mousedown", handleClick);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("mousedown", handleClick);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  const error = null;
  return (
    <div role="dialog" className="h-64 w-96 bg-neutral-200  absolute right-0 top-24" ref={modalRef}>
      <form onSubmit={handleSubmit(submit)} className="m-8 flex flex-col items-center">
        <Input label={"Email: "} id={"email"} type={"text"} placeholder="Digite aqui seu email" error={errors.email} className="w-64 rounded-md h-8" inputWidth="w-80" {...register("email")} />
        <Input
          label={"Senha: "}
          id={"password"}
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
          <Link to="/registerclient" className="text-blue-700 hover:text-blue-800">
            clique aqui
          </Link>
        </p>
      </form>
    </div>
  );
}
