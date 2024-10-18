import {Card} from "./card";
import img from "../../assets/calca.png";

type Product = {
  name: string;
  description: string;
  img: string;
  price: number;
};

export function CardList() {
  const mockList: Product[] = [
    {
      name: "Camiseta Básica",
      description: "Camiseta de algodão, ideal para o dia a dia.",
      img: img,
      price: Math.random() * (250 - 50) + 50,
    },
    {
      name: "Jaqueta Jeans",
      description: "Jaqueta jeans com bolsos frontais e ajuste na cintura.",
      img: img,
      price: Math.random() * (250 - 50) + 50,
    },
    {
      name: "Calça Skinny",
      description: "Calça jeans skinny com elastano para maior conforto.",
      img: img,
      price: Math.random() * (250 - 50) + 50,
    },
    {
      name: "Vestido Floral",
      description: "Vestido leve com estampa floral, perfeito para o verão.",
      img: img,
      price: Math.random() * (250 - 50) + 50,
    },
    {
      name: "Blusa de Tricô",
      description: "Blusa de tricô macio com gola redonda.",
      img: img,
      price: Math.random() * (250 - 50) + 50,
    },
    {
      name: "Tênis Esportivo",
      description: "Tênis leve e confortável, ideal para corridas e atividades físicas.",
      img: img,
      price: Math.random() * (250 - 50) + 50,
    },
    {
      name: "Saia Midi",
      description: "Saia midi de tecido leve com cintura alta e estampa geométrica.",
      img: img,
      price: Math.random() * (250 - 50) + 50,
    },
    {
      name: "Camisa Social",
      description: "Camisa social de algodão com corte slim fit.",
      img: img,
      price: Math.random() * (250 - 50) + 50,
    },
    {
      name: "Blazer Feminino",
      description: "Blazer estruturado com acabamento impecável para ocasiões formais.",
      img: img,
      price: Math.random() * (250 - 50) + 50,
    },
    {
      name: "Moletom com Capuz",
      description: "Moletom casual com capuz e bolso canguru.",
      img: img,
      price: Math.random() * (250 - 50) + 50,
    },
  ];

  console.log(mockList);
  return (
    <div className="mx-24 mb-8 p-2 px-20 flex flex-col items-center ">
      <h2 className="text-6xl text-center font-bold">Ofertas</h2>
      <ul className="flex mt-12 gap-8 overflow-x-auto p-4 max-w-full">
        {mockList.map((card, index) => {
          const abrevDescription = `${card.description.substring(0, 40)} ...`;
          return <Card key={index} name={card.name} description={abrevDescription} img={card.img} price={card.price} />;
        })}
      </ul>
      <button className="border-2 p-1 w-32 h-10 m-8 rounded-2xl border-neutral-800">Ver Mais</button>
    </div>
  );
}
