import {IoIosLogOut} from "react-icons/io";
import {ImProfile} from "react-icons/im";
import {HiOutlineShoppingBag} from "react-icons/hi2";
import {Link} from "react-router-dom";
import {useContext} from "react";
import {ClientContext} from "../../../providers/clientContext";

export function ClientModal() {
  const {logoff} = useContext(ClientContext);
  return (
    <div className="flex flex-col justify-center items-center gap-4 m-8">
      <ul className="flex flex-col gap-4 items-start">
        <li className="flex gap-2 items-center text-2xl hover:text-zinc-700">
          <ImProfile />
          <Link to={"/clientProfile"}>Perfil</Link>
        </li>
        <li className="flex gap-2 items-center text-2xl hover:text-zinc-700">
          <HiOutlineShoppingBag />
          Meus pedidos
        </li>
        <li className="flex gap-2 items-center text-2xl cursor-pointer hover:text-zinc-700 " onClick={() => logoff()}>
          <IoIosLogOut />
          Sair
        </li>
      </ul>
    </div>
  );
}
