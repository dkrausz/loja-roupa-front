import visa from "../../assets/badges/logo-visa-256.png";
import master from "../../assets/badges/logo-mastercard-256.png";
import pix from "../../assets/badges/logo-pix-256.png";
import mercado from "../../assets/badges/logo-mercado-pago-256.png";
import gitHub from "../../assets/badges/github.png";

export function Footer() {
  return (
    <footer className="flex justify-between mx-24 gap-16  ">
      <div className="flex items-center justify-center ">
        <p className="flex gap-6 items-center">
          desenvolvido por
          <div className="border-2 border-solid  w-28 rounded-2xl border-gray-600 hover:border-gray-950">           
            <a href="https://github.com/dkrausz" target="blank" className="flex items-center">
            <img src={gitHub} alt="" className="w-8" /> Danilo</a>
          </div>


          <div className="border-2 border-solid  w-28 rounded-2xl  border-gray-600 hover:border-gray-950">           
            <a href="https://github.com/anapaulama" target="blank" className="flex items-center">
            <img src={gitHub} alt="" className="w-8" />Ana Paula</a>
          </div>

          <div className="border-2 border-solid  w-28 rounded-2xl  border-gray-600 hover:border-gray-950">           
            <a href="https://github.com/matheusnardii" target="blank" className="flex items-center">
            <img src={gitHub} alt="" className="w-8" />Matheus</a>
          </div>     
        
        </p>
      </div>

      <div className="p-4 flex gap-4">
        <img src={visa} alt="" className="w-16 h-12 bg-white rounded-md" />
        <img src={master} alt="" className="w-16 h-12 bg-white rounded-md" />
        <img src={pix} alt="" className="w-16 h-12 bg-white rounded-md" />
        <img src={mercado} alt="" className="w-16 h-12 bg-white rounded-md" />
      </div>
    </footer>
  );
}
