import {SubmitHandler, useForm} from "react-hook-form";
import {Input} from "../../input/standard";
import {zodResolver} from "@hookform/resolvers/zod";
import {InputCPF} from "../../input/inputCPF";
import {useEffect, useState} from "react";
import {TClient} from "../../../providers/clientContext";
import {InputPhone} from "../../input/inputPhone";
import {format} from "date-fns";
import {clientSchema, TCreateClient} from "../registerClientForm/schema";

type IClientFormProps = {
  client?: TClient;
};

export function ClientProfileForm({client}: IClientFormProps) {
  const [updateForm, setUpdateForm] = useState(false);

  useEffect(() => {
    if (client) {
      setUpdateForm(true);
    } else {
      setUpdateForm(false);
    }
  }, []);

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
    defaultValues: client
      ? {
          name: client.name,
          email: client.email,
          password: "******",
          confirmPwd: "******",
          birthDate: new Date(format(client.birthDate, "dd/MM/yyyy")),
          CPF: client.CPF,
          phone: client.phone,
        }
      : undefined,
    resolver: zodResolver(clientSchema),
  });

  const submit: SubmitHandler<TCreateClient> = async (formData) => {
    console.log(formData);
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
        disabled={updateForm}
        {...register("name")}
      />
      <Input
        inputWidth="w-11/12"
        label="E-mail"
        id={"email"}
        type={"email"}
        placeholder="Digite seu e-mail"
        className="w-64 rounded-md h-8"
        error={errors.email}
        disabled={updateForm}
        {...register("email")}
      />

      <button className="w-11/12 h-10 bg-blue-500 rounded-xl text-zinc-200 mb-4 hover:bg-blue-600">Alterar Senha</button>

      <Input
        inputWidth="w-11/12"
        label="Data de Nascimento"
        id={"birthDate"}
        type={"date"}
        className="w-64 rounded-md h-8"
        error={errors.birthDate}
        max={minAge()}
        value={client ? format(client.birthDate, "yyyy-MM-dd") : undefined}
        disabled={updateForm}
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
        disabled={updateForm}
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
        disabled={updateForm}
        {...register("phone")}
      />

      <button className="w-11/12 h-10 bg-blue-500 rounded-xl text-zinc-200 hover:bg-blue-600" onClick={() => setUpdateForm(!updateForm)}>
        Editar
      </button>
    </form>
  );
}
