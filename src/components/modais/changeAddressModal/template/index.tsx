import {useContext, useEffect, useRef, useState} from "react";
import {Address} from "../address";
import {AddAddress} from "../../../form/addressForm";
import {ClientContext} from "../../../../providers/clientContext";

type IChangeAddressModalProps = {
  setUpdateAddress: React.Dispatch<React.SetStateAction<boolean>>;
};

export function ChangeAddressModal({setUpdateAddress}: IChangeAddressModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [addAddress, setAddAddress] = useState(false);
  const {setSelectedAddress, selectedAddress} = useContext(ClientContext);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!addAddress) {
        if (!modalRef.current?.contains(event.target as Node)) {
          setSelectedAddress(null);
          setUpdateAddress(false);
        }
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedAddress(null);
        setUpdateAddress(false);
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
    setSelectedAddress(null);
    setUpdateAddress(false);
  };

  return (
    <div role="dialog" className="w-full h-screen bg-gray-950/[0.8] inset-0 fixed flex justify-center items-center">
      <div className="w-2/5 bg-zinc-200 relative h-96 p-4 rounded-lg overflow-y-scroll" ref={modalRef}>
        <button className="border-2 border-slate-950	w-6 rounded absolute right-4 top-4" onClick={() => closeModal()}>
          X
        </button>
        {addAddress ? <AddAddress /> : <Address setAddAddress={setAddAddress} />}
      </div>
    </div>
  );
}
