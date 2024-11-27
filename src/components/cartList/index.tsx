import {useContext, useEffect} from "react";
import {ClientContext} from "../../providers/clientContext";
import {CartCard} from "./cartCard";

export function CartList() {
  const {cartList, retriveCartOnLocalStorage} = useContext(ClientContext);
  console.log(cartList);
  useEffect(() => {
    retriveCartOnLocalStorage();
  }, []);
  return (
    <>
      <div>
        <p>Excluir tudo</p>
        <div>
          {cartList.map((card) => {
            return <CartCard key={card.publicId} id={card.publicId} name={card.name} itemQuantity={card.quantity} price={card.price} />;
          })}
        </div>
      </div>
    </>
  );
}
