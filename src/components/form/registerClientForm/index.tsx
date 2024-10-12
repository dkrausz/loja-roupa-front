import {SubmitHandler, useForm} from "react-hook-form";
import {Input} from "../../Input";
import {zodResolver} from "@hookform/resolvers/zod";
import {clientSchema, TCreateClient} from "./schema";

export function RegisterClientForm() {
  const minAge = () => {
    const today = new Date();
    const minAge = today.setFullYear(today.getFullYear() - 18, today.getMonth(), today.getDay());
    //console.log(new Date(minAge).toDateString().toISOString());
    const minAgeDate = new Date(minAge);
    const stringAge = `${minAgeDate.getFullYear()}-${minAgeDate.getMonth()}-${minAgeDate.getDay()}`;
    console.log(stringAge);

    return stringAge;
  };

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<TCreateClient>({resolver: zodResolver(clientSchema)});

  const submit: SubmitHandler<TCreateClient> = async (formData) => {
    console.log(formData);
  };

  return (
    <form className="flex flex-col gap-4 items-center" onSubmit={handleSubmit(submit)}>
      <Input inputWidth="w-96" label="Nome" id={"name"} type={"text"} placeholder="Digite seu nome" className="w-64 rounded-md h-8" error={errors.name} {...register("name")} />
      <Input inputWidth="w-96" label="E-mail" id={"email"} type={"email"} placeholder="Digite seu e-mail" className="w-64 rounded-md h-8" error={errors.email} {...register("email")} />
      <Input inputWidth="w-96" label="Senha" id={"senha"} type={"password"} placeholder="Digite sua senha" className="w-64 rounded-md h-8" error={errors.password} {...register("password")} />
      <Input
        inputWidth="w-96"
        label="Confirme sua senha"
        id={"confirmPassword"}
        type={"password"}
        placeholder="Confirme sua senha"
        className="w-64 rounded-md h-8"
        error={errors.password}
        {...register("confirmPwd")}
      />
      <Input
        inputWidth="w-96"
        label="Data de Nascimento"
        id={"birthDate"}
        type={"date"}
        placeholder="Digite seu e-mail"
        className="w-64 rounded-md h-8"
        error={errors.birthDate}
        max={minAge()}
        {...register("birthDate")}
      />
      <Input inputWidth="w-96" label="CPF" id={"cpf"} type={"text"} placeholder="Digite seu CPF" className="w-64 rounded-md h-8" error={errors.CPF} {...register("CPF")} />
      <Input inputWidth="w-96" label="Telefone" id={"phone"} type={"text"} placeholder="Digite seu telefone" className="w-64 rounded-md h-8" error={errors.phone} {...register("phone")} />

      <button type="submit">Enviar</button>
    </form>
  );
}
