import img1 from "../../../assets/calca.png";

export function Card() {
  const description =
    'Lorem, ipsum dolor sit amet consectetur ';
  const price = 199.45;
  return (
    <li className="w-56 h-72 rounded-2xl p-1 flex flex-col items-center  hover:border-stone-400 hover:border-solid hover:border-2 min-w-56">
      <img src={img1} alt="" className="w-52 rounded-2xl" />
      <h3 className="text-2xl font-semibold">Calça</h3>
      <p className="leading-4 mx-4">{description}</p>
      <p className="text-red-700 font-bold">R${price}</p>
    </li>
  );
}
