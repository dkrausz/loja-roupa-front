import {Link} from "react-router-dom";

interface ICardProps {
  id: string;
  name: string;
  img: string;
  description: string;
  price: number;
}

export function Card({id, name, img, description, price}: ICardProps) {
  const fomatedPrice = new Intl.NumberFormat("pt-BR", {style: "currency", currency: "BRL"}).format(price / 100);

  return (
    <Link to={`/products/${id}`}>
      <li className="w-56 min-w-56 h-96 rounded-2xl p-1 flex flex-col items-center justify-around  hover:border-stone-400 hover:border-solid hover:border-2">
        <img src={img} alt="" className="w-52 rounded-2xl" />
        <h3 className="text-2xl font-semibold text-center">{name}</h3>
        <p className="leading-4 mx-4 p-2">{description}</p>
        <p className="text-red-700 font-bold p-2">{fomatedPrice}</p>
      </li>
    </Link>
  );
}
