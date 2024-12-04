import {BsTrash} from "react-icons/bs";
import img from "../../../assets/calca.png";
import {useContext, useEffect, useState} from "react";
import {ClientContext} from "../../../providers/clientContext";
import {FiMinusCircle, FiPlusCircle} from "react-icons/fi";

interface CartCardProps {
  id: string;
  name: string;
  itemQuantity: number;
  price: number;
}

export function CartCard({id, name, itemQuantity, price}: CartCardProps) {
  const [quantity, setQuantity] = useState(itemQuantity);
  const [total, setTotal] = useState(0);

  const {updateCart, deleteFromCart} = useContext(ClientContext);

  const fomatedPrice = new Intl.NumberFormat("pt-BR", {style: "currency", currency: "BRL"}).format(total / 100);

  const handleSubtractQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => {
        return prev - 1;
      });
      const value = quantity - 1;
      updateCart(id, value);
    }
  };

  const handleSumQuantity = () => {
    const oldValue = quantity;
    setQuantity((prev) => {
      return prev + 1;
    });
    updateCart(id, oldValue + 1);
  };

  const deleteProduct = () => {
    deleteFromCart(id);
  };

  useEffect(() => {
    setTotal(price * quantity);
  }, [quantity]);

  return (
    <div className="flex bg-slate-200 gap-2 p-2 max-w-md rounded mx-auto">
      <div className=" w-52 flex">
        <img src={img} alt="" className="w-24" />
        <h3 className=" break-words w-24 text-center mt-2 font-medium">{name}</h3>
      </div>
      <div className="flex flex-col items-center gap-2 w-32">
        <p>quandidade</p>
        <div className="flex gap-2 items-center">
          <FiMinusCircle className="cursor-pointer" onClick={() => handleSubtractQuantity()} />
          <span>{quantity}</span>
          <FiPlusCircle className="cursor-pointer" onClick={() => handleSumQuantity()} />
        </div>
      </div>
      <div className="flex flex-col gap-2 w-32 items-center">
        <p>total</p>
        <p> {fomatedPrice}</p>
        <BsTrash className="cursor-pointer" onClick={() => deleteProduct()} />
      </div>
    </div>
  );
}
