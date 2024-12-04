import {useContext, useEffect} from "react";
import {ClientContext, paymentType} from "../../providers/clientContext";
import {CartCard} from "./cartCard";

interface CartListProps {
  total: number;
  setTotal: React.Dispatch<React.SetStateAction<number>>;
  setPaymentType: React.Dispatch<React.SetStateAction<paymentType | null>>;
}

export function CartList({total, setTotal, setPaymentType}: CartListProps) {
  const {cartList, clearCart} = useContext(ClientContext);

  const fomatedPrice = new Intl.NumberFormat("pt-BR", {style: "currency", currency: "BRL"}).format(total / 100);

  const sumTotal = () => {
    setTotal(cartList.reduce((accumulator, product) => accumulator + product.price * product.quantity, 0));
  };

  const deleteAllItens = () => {
    clearCart();
  };

  useEffect(() => {
    sumTotal();
  }, [cartList]);
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="flex w-full">
          <a className="cursor-pointer hover:text-blue-800 hover:font-medium " onClick={() => deleteAllItens()}>
            Excluir tudo
          </a>
        </div>
        <div className="flex flex-col gap-4 mx-auto">
          {cartList.map((card) => {
            return <CartCard key={card.publicId} id={card.publicId} name={card.name} itemQuantity={card.quantity} price={card.price} />;
          })}
          <div className="flex justify-between px-4">
            <h3>Método de pagamento: </h3>
            <select name="paymentMethod" onChange={(e) => setPaymentType(e.target.value as paymentType)}>
              <option value={paymentType.PIX}>Pix</option>
              <option value={paymentType.CARTAO_CREDITO}>Cartao</option>
              <option value={paymentType.BOLETO}>Boleto</option>
            </select>
          </div>
          <div className=" flex justify-between px-4">
            <h3 className="text-lg font-semibold">Total</h3>
            <h3 className="text-lg font-semibold">{fomatedPrice}</h3>
          </div>
        </div>
      </div>
    </>
  );
}
