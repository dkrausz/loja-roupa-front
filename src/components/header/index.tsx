import {VscAccount} from "react-icons/vsc";
import megaStore from "../../assets/Mega-Store-17-09-2024 (1).png";
import {SearchBar} from "../searchBar";
import {Cart} from "../cart";
import {Link} from "react-router-dom";
import {useContext} from "react";
import {ClientContext} from "../../providers/clientContext";

interface IHeaderProps {
  SetShowLogintModal: React.Dispatch<React.SetStateAction<boolean>>;
  ShowLoginModal: boolean;
}

export function Header({SetShowLogintModal, ShowLoginModal}: IHeaderProps) {
  const {activeClient} = useContext(ClientContext);

  return (
    <header className="flex items-center justify-between mx-24 px-4">
      <Link to="/">
        <img src={megaStore} alt="Logo da loja" className="w-60" />
      </Link>
      <nav className="flex items-center">
        <ul className="flex gap-20 border-none ">
          <li>Shop</li>
          <li>Ofertas</li>
          <li>Novidades</li>
          <li>Marcas</li>
        </ul>
      </nav>
      <div className="flex items-center gap-8">
        <SearchBar />
        <h2>Olá {activeClient ? activeClient.name : "Visitante"}</h2>

        <Cart />
        <VscAccount size={25} onClick={() => SetShowLogintModal(!ShowLoginModal)} />
      </div>
    </header>
  );
}
