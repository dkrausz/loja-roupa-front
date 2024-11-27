import {Card} from "./card";
import img from "../../assets/calca.png";
import {useContext, useEffect} from "react";
import {ControllerContext} from "../../providers/controllerContext";
import {useNavigate} from "react-router-dom";

export function CardList() {
  const {getProducts, productList} = useContext(ControllerContext);
  const navigate = useNavigate();

  useEffect(() => {
    getProducts(1, 10);
  }, []);

  return (
    <div className="mx-24 mb-8 p-2 px-20 flex flex-col items-center ">
      <h2 className="text-6xl text-center font-bold">Ofertas</h2>
      <ul className="flex mt-12 gap-8 overflow-x-auto p-4 max-w-full">
        {productList.map((card) => {
          const abrevDescription = `${card.description.substring(0, 40)} ...`;
          return <Card key={card.publicId} id={card.publicId} name={card.name} description={abrevDescription} img={img} price={card.price} />;
        })}
      </ul>
      <button className="border-2 p-1 w-32 h-10 m-8 rounded-2xl border-neutral-800" onClick={() => navigate("/products")}>
        Ver Mais
      </button>
    </div>
  );
}
