import {CartList} from "../../components/cartList";
import {TemplatePage} from "../Template";

export function CartPage() {
  return (
    <TemplatePage>
      <div className="border-2 mx-12">
        <h3>Cart Page</h3>
        <CartList />
      </div>
    </TemplatePage>
  );
}

//date: z.date(),
//paymentType: z.enum(["PIX", "CARTAO_CREDITO", "BOLETO"]),
//clientId: z.number().positive(),
//status: z.enum(["IN_PROGRESS", "COMPLETED", "DELIVERED"]),
//discount: z.boolean(),
//total: z.number().positive(),
//storeId: z.number(),
//products: productSchema.array().nullish(),
