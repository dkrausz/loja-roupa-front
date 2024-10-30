import {SubmitHandler, useForm} from "react-hook-form";
import {Input} from "../../input/standard";
import {zodResolver} from "@hookform/resolvers/zod";
import {clientSchema, TCreateClient} from "./schema";
import {InputCPF} from "../../input/inputCPF";
import {useContext} from "react";
import {ClientContext} from "../../../providers/clientContext";
import {InputPhone} from "../../input/inputPhone";
import {InputPassword} from "../../input/inputPassword";

export function RegisterClientForm() {
  const {clientRegister} = useContext(ClientContext);

  const minAge = () => {
    const today = new Date();
    const minAge = today.setFullYear(today.getFullYear() - 18, today.getMonth(), today.getDay());
    const minAgeDate = new Date(minAge);
    const stringAge = `${minAgeDate.getFullYear()}-${minAgeDate.getMonth()}-${minAgeDate.getDay()}`;
    return stringAge;
  };

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<TCreateClient>({
    resolver: zodResolver(clientSchema),
  });

  const submit: SubmitHandler<TCreateClient> = async (formData) => {
    console.log(formData);

    clientRegister(formData);
  };

  return (
    <form className="flex flex-col gap-4 items-center  w-1/3 mx-auto rounded-3xl bg-zinc-300 p-7" onSubmit={handleSubmit(submit)}>
      <Input
        inputWidth="w-11/12"
        label="Nome"
        id={"name"}
        type={"text"}
        placeholder="Digite seu nome"
        className="w-64 rounded-md h-8 "
        error={errors.name}
        {...register("name")}
      />
      <Input
        inputWidth="w-11/12"
        label="E-mail"
        id={"email"}
        type={"email"}
        placeholder="Digite seu e-mail"
        className="w-64 rounded-md h-8 "
        error={errors.email}
        {...register("email")}
      />
      <InputPassword
        inputWidth="w-11/12"
        label="Senha"
        id={"senha"}
        placeholder="Digite sua senha"
        className="w-64 rounded-md h-8"
        error={errors.password}
        {...register("password")}
      />

      <InputPassword
        inputWidth="w-11/12"
        label="Confirme sua senha"
        id={"confirmPwd"}
        placeholder="Confirme sua senha"
        className="w-64 rounded-md h-8"
        error={errors.confirmPwd}
        {...register("confirmPwd")}
      />

      <Input
        inputWidth="w-11/12"
        label="Data de Nascimento"
        id={"birthDate"}
        type={"date"}
        className="w-64 rounded-md h-8"
        error={errors.birthDate}
        max={minAge()}
        {...register("birthDate")}
      />
      <InputCPF
        inputWidth="w-11/12"
        label="CPF"
        id={"cpf"}
        type={"text"}
        placeholder="Ex: 000.000.000-00"
        className="w-64 rounded-md h-8"
        error={errors.CPF}
        {...register("CPF")}
      />

      <InputPhone
        inputWidth="w-11/12"
        label="Telefone"
        id={"phone"}
        type={"text"}
        placeholder="(00)00000-0000"
        className="w-64 rounded-md h-8"
        error={errors.phone}
        {...register("phone")}
      />

      <button type="submit" className="w-11/12 h-10 bg-blue-500 rounded-xl text-zinc-200">
        Enviar
      </button>
    </form>
  );
}
