import {BsTrash} from "react-icons/bs";
import img from "../../../assets/calca.png";
import {useContext, useEffect, useState} from "react";
import {ClientContext} from "../../../providers/clientContext";

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

  const handleSubtractQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
    updateCart(id, quantity);
  };

  const handleSumQuantity = () => {
    setQuantity(quantity + 1);
    updateCart(id, quantity);
  };

  const deleteProduct = () => {
    deleteFromCart(id);
  };

  useEffect(() => {
    setTotal(price * quantity);
  }, [quantity]);

  return (
    <div>
      <p>{name}</p>
      <img src={img} alt="" />
      <div>
        <p>quandidade</p>
        <span onClick={() => handleSubtractQuantity}>-</span>
        <span>{quantity}</span>
        <span onClick={() => handleSumQuantity}>+</span>
      </div>
      <div>
        <p>total R${total}</p>
        <BsTrash onClick={() => deleteProduct} />
      </div>
    </div>
  );
}
