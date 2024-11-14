import {useContext, useEffect, useRef} from "react";
import {ClientContext} from "../../../../providers/clientContext";

interface IDeleteProps {
  id?: number;
  setDeleteAddressModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectAddressId: React.Dispatch<React.SetStateAction<number | undefined>>;
}

export function DeleteConfirm({id, setDeleteAddressModal, setSelectAddressId}: IDeleteProps) {
  const {deleteAddress} = useContext(ClientContext);

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!modalRef.current?.contains(event.target as Node)) {
        setSelectAddressId(undefined);
        setDeleteAddressModal(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectAddressId(undefined);
        setDeleteAddressModal(false);
      }
    };

    window.addEventListener("mousedown", handleClick);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("mousedown", handleClick);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const closeModal = () => {
    setSelectAddressId(undefined);
    setDeleteAddressModal(false);
  };

  const deleteConfirm = (addressId: number | undefined) => {
    if (addressId) deleteAddress(addressId);
    setTimeout(() => closeModal(), 2000);
  };

  return (
    <div role="dialog" className="w-full h-screen bg-gray-950/[0.8] inset-0 fixed flex justify-center items-center">
      <div className="w-96 bg-zinc-200 relative h-28 p-4 rounded-lg flex flex-col " ref={modalRef}>
        <button className="text-sm rounded absolute right-4 top-4 border-2 border-slate-950 w-5" onClick={() => closeModal()}>
          X
        </button>
        <h3>Tem certeza que deseja deletar o endereço?</h3>
        <div className="m-4 flex justify-around">
          <button className="bg-red-500 w-24 h-8 rounded-lg text-white hover:bg-red-600" onClick={() => closeModal()}>
            Cancelar
          </button>
          <button className="bg-green-500 w-24 h-8 rounded-lg text-white hover:bg-green-600" onClick={() => deleteConfirm(id)}>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
