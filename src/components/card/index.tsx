import img1 from "../../assets/calca.jpg";

export function Card() {
  const description =
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit.";
  const price = 199.45;
  return (
    <li className="max-w-52 border-neutral-800 border-solid border-2 rounded-2xl mx-8 p-1 flex flex-col items-center">
      <img src={img1} alt="" className="max-w-36 rounded-2xl" />
      <h3 className="text-2xl font-semibold">Calça</h3>
      <p className="leading-4 mx-4">{description}</p>
      <p>R${price}</p>
    </li>
  );
}
