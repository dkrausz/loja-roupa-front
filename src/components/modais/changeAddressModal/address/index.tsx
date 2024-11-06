import {FiPlusSquare} from "react-icons/fi";
import {ClientContext} from "../../../../providers/clientContext";
import {AddressCard} from "../addressCard";
import {useContext} from "react";

interface IAddressProps {
  setAddAddress: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Address({setAddAddress}: IAddressProps) {
  const {activeClient} = useContext(ClientContext);
  console.log(activeClient);

  return (
    <div className="m-8">
      <div
        className="border-dashed border-2 border-zinc-400 rounded-lg h-20 mb-8 flex items-center px-8 justify-between cursor-pointer"
        onClick={() => setAddAddress(true)}>
        <FiPlusSquare size={55} className="text-zinc-400" />
        <strong className="text-zinc-400">Adicionar novo endereço</strong>
      </div>
      <div className="flex flex-col gap-4">
        {activeClient?.address.map((card) => {
          return <AddressCard key={card.id} address={card} setAddAddress={setAddAddress} />;
        })}
      </div>
    </div>
  );
}
