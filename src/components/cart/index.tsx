import {BsCart3} from "react-icons/bs";
import {useNavigate} from "react-router-dom";

export function Cart() {
  const navigate = useNavigate();
  const cartSize = 0;
  return (
    <div className=" relative">
      <BsCart3 size={25} className="cursor-pointer" onClick={() => navigate("/cartPage")} />
      <span className="bg-blue-500 text-white rounded-full h-4 w-4 text-center text-xs font-semibold absolute -top-1 -right-2 cursor-pointer">{cartSize}</span>
    </div>
  );
}
