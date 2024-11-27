import {useContext, useEffect, useState} from "react";
import {TemplatePage} from "../Template";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import {ControllerContext, Product} from "../../providers/controllerContext";
import {useParams} from "react-router-dom";
import img from "../../assets/calca.png";
import {FiMinusCircle, FiPlusCircle} from "react-icons/fi";
import {ClientContext} from "../../providers/clientContext";

export function ProductPage() {
  const {id} = useParams();
  const {getProductById} = useContext(ControllerContext);
  const {addToCart} = useContext(ClientContext);
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);

  const getProduct = async () => {
    if (id) {
      const data = await getProductById(id);
      setProduct(data);
    }
  };

  const addProduct = () => {
    if (product) {
      const newProduct = {...product, quantity: quantity};
      addToCart(newProduct);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      <TemplatePage>
        <div className="flex justify-center">
          <div className="flex  max-w-5xl">
            <div className="flex items-center">
              <IoIosArrowBack size={30} className="text-zinc-400 border-2 h-12 mx-2 cursor-pointer w-10" />
              <img src={img} alt="" />
              <IoIosArrowForward size={30} className="text-zinc-400 border-2 h-12 mx-2 cursor-pointer w-10" />
            </div>

            <div className="flex flex-col justify-between items-center p-4 mx-auto">
              <h2 className="text-2xl">{product?.name}</h2>
              <p className="max-w-sm">{product?.description}</p>
              <div className="flex flex-col items-center gap-2">
                <strong>R$ {product ? (product.price / 100).toFixed(2) : null}</strong>

                <div className="flex gap-2 items-center">
                  <FiMinusCircle
                    className="cursor-pointer"
                    onClick={() => {
                      setQuantity(quantity - 1);
                      if (quantity <= 1) setQuantity(1);
                    }}
                  />
                  <span className="bg-slate-100 w-6 rounded text-center">{quantity}</span>
                  <FiPlusCircle className="cursor-pointer" onClick={() => setQuantity(quantity + 1)} />
                </div>
                <button className="w-80 h-8 bg-blue-500 rounded-xl text-zinc-200 mt-2" onClick={() => addProduct()}>
                  Adicionar ao carrinho
                </button>
              </div>
            </div>
          </div>
        </div>
      </TemplatePage>
    </>
  );
}
