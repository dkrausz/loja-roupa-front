import {VscAccount} from "react-icons/vsc";
import megaStore from "../../assets/Mega-Store-17-09-2024 (1).png";
import {SearchBar} from "../searchBar";
import {Cart} from "../cart";
import {Link} from "react-router-dom";
import {useContext} from "react";
import {ClientContext} from "../../providers/clientContext";
import {ControllerContext} from "../../providers/controllerContext";

export function Header() {
  const {activeClient} = useContext(ClientContext);
  const {showTemplateModal, setShowTemplateModal} = useContext(ControllerContext);

  return (
    <header className="flex items-center justify-between mx-24 px-4">
      <Link to="/">
        <img src={megaStore} alt="Logo da loja" className="w-60" />
      </Link>
      <nav className="flex items-center">
        <ul className="flex gap-16 border-none mx-4">
          <li>
            <Link to="/products">Shop</Link>
          </li>
          <li>
            <Link to="/offers">Ofertas</Link>
          </li>
          <li>
            <Link to="/news">Novidades</Link>
          </li>
          <li>
            <Link to="/brands">Marcas</Link>
          </li>
        </ul>
      </nav>
      <div className="flex items-center gap-8">
        <SearchBar />
        <h2>Olá {activeClient ? activeClient.name : "Visitante"}</h2>

        <Cart />
        <VscAccount size={25} className="cursor-pointer" onClick={() => setShowTemplateModal(!showTemplateModal)} />
      </div>
    </header>
  );
}
