interface ICardProps {
  name: string;
  img: string;
  description: string;
  price: number;
}

export function Card({name, img, description, price}: ICardProps) {
  // const description = "Lorem, ipsum dolor sit amet consectetur ";
  // const price = 199.45;
  return (
    <li className="w-56 h-96 rounded-2xl p-1 flex flex-col items-center justify-around  hover:border-stone-400 hover:border-solid hover:border-2">
      <img src={img} alt="" className="w-52 rounded-2xl" />
      <h3 className="text-2xl font-semibold">{name}</h3>
      <p className="leading-4 mx-4 p-2">{description}</p>
      <p className="text-red-700 font-bold p-2">R${price}</p>
    </li>
  );
}
