
import { VscAccount } from "react-icons/vsc";
import megaStore from "../../assets/Mega-Store-17-09-2024 (1).png";
import { SearchBar } from "../searchBar";
import { Cart } from "../cart";

export function Header() {
  return (
    <header className="flex items-center justify-between mx-24 px-4">
      <img src={megaStore} alt="Logo da loja" className="w-60" />
      <nav className="flex items-center">
        <ul className="flex gap-20 border-none ">
          <li >Shop</li>
          <li>Ofertas</li>
          <li>Novidades</li>
          <li>Marcas</li>
        </ul>
      </nav>
      <div className="flex items-center gap-8">
        <SearchBar />
        <Cart/>
        <VscAccount size={25} />
      </div>
    </header>
  );
}
