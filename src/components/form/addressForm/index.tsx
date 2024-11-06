import {useContext, useEffect, useState} from "react";
import {InputZipCode} from "../../input/inputZipCode";
import {Input} from "../../input/standard";
import {OptionalIViaCep} from "../registerClientForm";
import {zodResolver} from "@hookform/resolvers/zod";
import {SubmitHandler, useForm} from "react-hook-form";
import {ClientContext, IAddress} from "../../../providers/clientContext";
import {addressSchema} from "../registerClientForm/schema";
import {isEqual} from "lodash";

export function AddAddress() {
  const [address, setAddress] = useState<OptionalIViaCep | null>(null);
  const [disableFields, setDisableFields] = useState(false);
  const {registerAddress, activeClient, selectedAddress} = useContext(ClientContext);

  useEffect(() => {
    if (selectedAddress) {
      setDisableFields(true);
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<IAddress>({
    defaultValues: selectedAddress
      ? {
          zipCode: selectedAddress.zipCode,
          street: selectedAddress.street,
          number: selectedAddress.number,
          complement: selectedAddress.complement,
          neighborhood: selectedAddress.neighborhood,
          state: selectedAddress.state,
          city: selectedAddress.city,
          country: selectedAddress.country,
        }
      : undefined,
    resolver: zodResolver(addressSchema),
  });

  const hasAddress = () => {
    if (selectedAddress) return true;
    return false;
  };

  const submit: SubmitHandler<IAddress> = async (formData) => {
    const oldAddress = {
      city: selectedAddress?.city,
      complement: selectedAddress?.complement,
      country: selectedAddress?.country,
      neighborhood: selectedAddress?.neighborhood,
      number: selectedAddress?.number,
      state: selectedAddress?.state,
      street: selectedAddress?.street,
      zipCode: selectedAddress?.zipCode,
    };

    const updatedAddress = {
      city: formData?.city,
      complement: formData?.complement,
      country: formData?.country,
      neighborhood: formData?.neighborhood,
      number: formData?.number,
      state: formData?.state,
      street: formData?.street,
      zipCode: formData?.zipCode,
    };

    console.log("SelectAddress", oldAddress);
    console.log("FormData", updatedAddress);
    console.log(isEqual(oldAddress, updatedAddress));

    if (selectedAddress && disableFields) {
      setDisableFields(false);
    } else if (selectedAddress != null && disableFields === false) {
      if (isEqual(oldAddress, updatedAddress)) {
        setDisableFields(true);
      } else {
        alert("faz o update");
      }
    } else {
      if (activeClient) {
        registerAddress(activeClient?.publicId, formData);
      }
    }
  };

  return (
    <>
      <h2 className="text-center text-2xl font-semibold my-2">{hasAddress() ? "Alterar endereço" : "Cadastro novo endereço"}</h2>

      <form className="flex bg-zinc-300 rounded-lg flex-col items-center justify-normal py-4" onSubmit={handleSubmit(submit)}>
        <InputZipCode
          inputWidth="w-11/12 px-6  m-auto "
          label="CEP"
          id={"zipCode"}
          setAddress={setAddress}
          type={"numbers"}
          className="w-64 rounded-md h-8"
          disabled={disableFields}
          error={errors.zipCode}
          {...register("zipCode")}
        />

        <Input
          inputWidth="w-11/12 px-6 m-auto "
          label="Rua"
          id={"street"}
          type={"text"}
          className="w-64 rounded-md h-8"
          disabled={disableFields}
          error={errors.street}
          value={address ? address.logradouro : undefined}
          {...register("street")}
        />

        <Input
          inputWidth="w-11/12 px-6 m-auto "
          label="Number"
          id={"number"}
          type={"text"}
          className="w-64 rounded-md h-8"
          disabled={disableFields}
          error={errors.number}
          {...register("number")}
        />

        <Input
          inputWidth="w-11/12 px-6 m-auto "
          label="Complemento"
          id={"complement"}
          type={"text"}
          className="w-64 rounded-md h-8"
          disabled={disableFields}
          error={errors.complement}
          {...register("complement")}
        />

        <Input
          inputWidth="w-11/12 px-6 m-auto "
          label="Bairro"
          id={"neighborhood"}
          type={"text"}
          className="w-64 rounded-md h-8"
          value={address ? address.bairro : undefined}
          disabled={disableFields}
          error={errors.neighborhood}
          {...register("neighborhood")}
        />

        <Input
          inputWidth="w-11/12 px-6 m-auto "
          label="Estado"
          id={"state"}
          type={"text"}
          className="w-64 rounded-md h-8"
          value={address ? address.estado : undefined}
          disabled={disableFields}
          error={errors.state}
          {...register("state")}
        />

        <Input
          inputWidth="w-11/12 px-6 m-auto "
          label="Cidade"
          id={"city"}
          type={"text"}
          className="w-64 rounded-md h-8"
          value={address ? address.localidade : undefined}
          disabled={disableFields}
          error={errors.city}
          {...register("city")}
        />

        <Input
          inputWidth="w-11/12 px-6 m-auto "
          label="Pais"
          id={"country"}
          type={"text"}
          className="w-64 rounded-md h-8"
          value="Brasil"
          disabled={disableFields}
          error={errors.country}
          {...register("country")}
        />

        <button className="w-11/12 my-4 h-10 bg-blue-500 rounded-xl text-zinc-200 hover:bg-blue-600" type="submit" disabled={isSubmitting}>
          {hasAddress() ? "Editar" : "Adicionar"}
        </button>
      </form>
    </>
  );
}
