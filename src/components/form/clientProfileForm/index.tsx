import {SubmitHandler, useForm} from "react-hook-form";
import {Input} from "../../input/standard";
import {zodResolver} from "@hookform/resolvers/zod";
import {InputCPF} from "../../input/inputCPF";
import {useContext, useEffect, useState} from "react";
import {TClient, IClient, ClientContext} from "../../../providers/clientContext";
import {InputPhone} from "../../input/inputPhone";
import {format} from "date-fns";
import {updateClientSchema} from "./schema";
import {ChangePasswordModal} from "../../modais/changePasswordModal";
import {TUpdateClient} from "./schema";
import {isEqual} from "lodash";

type IClientFormProps = {
  client?: TClient;
};

export function ClientProfileForm({client}: IClientFormProps) {
  const [updateForm, setUpdateForm] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);
  const [clientOldData, setClientOldData] = useState<IClient | null>(null);
  const {clientUpdate} = useContext(ClientContext);

  useEffect(() => {
    if (client) {
      setClientOldData(client);
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
  } = useForm<TUpdateClient>({
    defaultValues: client
      ? {
          name: client.name,
          email: client.email,
          birthDate: new Date(client.birthDate).toISOString().split("T")[0],
          CPF: client.CPF,
          phone: client.phone,
        }
      : undefined,
    resolver: zodResolver(updateClientSchema),
  });

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  const submit: SubmitHandler<TUpdateClient> = (formData) => {
    console.log("??");
    console.log(formData);
    console.log(clientOldData);

    const oldData = {
      CPF: clientOldData?.CPF,
      birthDate: format(clientOldData!.birthDate, "yyyy/MM/dd"),
      email: clientOldData?.email,
      name: clientOldData?.name,
      phone: clientOldData?.phone,
    };
    console.log("primeiro foi");
    console.log("dataform", formData.birthDate);

    const newData = {
      CPF: formData?.CPF,
      birthDate: format(formData!.birthDate!.toString(), "yyyy/MM/dd"),
      email: formData?.email,
      name: formData?.name,
      phone: formData?.phone,
    };
    console.log("nada?");

    console.log("old", oldData);
    console.log("new", newData);
    console.log(isEqual(oldData, newData));

    if (updateForm) {
      setUpdateForm(false);
    } else {
      if (!isEqual(oldData, newData)) {
        console.log("faz o update");
        clientUpdate(formData);
        setUpdateForm(true);
      } else {
        setUpdateForm(true);
      }
    }
  };

  return (
    <>
      {passwordModal ? <ChangePasswordModal setPasswordModal={setPasswordModal} /> : null}
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
          className="w-64 rounded-md h-8 "
          error={errors.email}
          disabled={updateForm}
          {...register("email")}
        />

        <button className="w-11/12 h-10 bg-blue-500 rounded-xl text-zinc-200 mb-4 hover:bg-blue-600" onClick={() => setPasswordModal(!passwordModal)}>
          Alterar Senha
        </button>

        <Input
          inputWidth="w-11/12"
          label="Data de Nascimento"
          id={"birthDate"}
          type={"date"}
          className="w-64 rounded-md h-8"
          error={errors.birthDate}
          max={minAge()}
          //value={client ? format(client.birthDate, "yyyy-MM-dd") : undefined}
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

        <button className="w-11/12 h-10 bg-blue-500 rounded-xl text-zinc-200 hover:bg-blue-600" type="submit">
          Editar
        </button>
      </form>
    </>
  );
}
