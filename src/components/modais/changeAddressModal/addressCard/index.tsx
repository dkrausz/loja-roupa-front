import {BsTrash} from "react-icons/bs";
import {ClientContext, IAddress} from "../../../../providers/clientContext";
import {CiEdit} from "react-icons/ci";
import {useContext} from "react";

interface IAddressCardProp {
  address: IAddress;
  setAddAddress: React.Dispatch<React.SetStateAction<boolean>>;
}

export function AddressCard({address, setAddAddress}: IAddressCardProp) {
  const {setSelectedAddress} = useContext(ClientContext);

  const editAddress = () => {
    setSelectedAddress(address);
    setAddAddress(true);
  };

  return (
    <div className="w-full p-4 h-40 bg-zinc-300 flex-col rounded-lg leading-7">
      <div className="flex justify-between">
        <p>Rua: {address.street}</p>
        <p>Numero: {address.number}</p>
      </div>
      <div className="flex justify-between">
        <p>Complemento: {address.complement}</p>
        <p>Bairro: {address.neighborhood}</p>
      </div>
      <div className="flex justify-between">
        <p>Cidade: {address.city}</p>
        <p>Estado: {address.state}</p>
      </div>
      <div className="flex justify-between">
        <p>CEP: {address.zipCode}</p>
        <p>Pais: {address.country}</p>
      </div>
      <div className="flex justify-end gap-4 my-1">
        <CiEdit size={20} className="cursor-pointer" onClick={() => editAddress()} />
        <BsTrash size={20} className="text-red-500 cursor-pointer" />
      </div>
    </div>
  );
}
