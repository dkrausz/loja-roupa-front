import {useNavigate} from "react-router-dom";
import {CartList} from "../../components/cartList";
import {TemplatePage} from "../Template";
import {useContext, useEffect, useState} from "react";
import {ClientContext, paymentType, status, TOrderWithoutProducts} from "../../providers/clientContext";

export function CartPage() {
  const [total, setTotal] = useState(0);
  const [paymentType, setPaymentType] = useState<paymentType | null>(null);
  const {cartList, sendNewOrder} = useContext(ClientContext);
  const navigate = useNavigate();
  const backToHome = () => {
    navigate("/");
  };

  const confirmOrder = () => {
    if (cartList) {
      const newOrder: TOrderWithoutProducts = {
        paymentType: paymentType,
        status: status.IN_PROGRESS,
        discount: false,
        total: total,
      };
      sendNewOrder(newOrder);
    } else {
      alert("Carrinho vazio!");
    }
  };

  useEffect(() => {
    console.log(paymentType);
  }, [paymentType]);
  return (
    <TemplatePage>
      <div className=" mx-auto flex flex-col items-center gap-4 my-4 max-w-md">
        <h3 className="text-3xl font-semibold">Carrinho</h3>
        <CartList total={total} setTotal={setTotal} setPaymentType={setPaymentType} />

        <div className="flex w-full justify-between">
          <button className="bg-red-500 w-24 h-8 rounded-lg text-white hover:bg-red-600" onClick={() => backToHome()}>
            Voltar
          </button>
          <button className="bg-green-500 w-48 h-8 rounded-lg text-white hover:bg-green-600" onClick={() => confirmOrder()}>
            Confirmar compra
          </button>
        </div>
      </div>
    </TemplatePage>
  );
}
