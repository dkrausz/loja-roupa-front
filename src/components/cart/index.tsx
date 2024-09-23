import { BsCart3 } from "react-icons/bs";

export function Cart(){
const cartSize=0;
    return(
        <div className=" relative">
        <BsCart3 size={25} />
        <span className="bg-blue-500 text-white rounded-full h-4 w-4 text-center text-xs font-semibold absolute -top-1 -right-2">{cartSize}</span>
        
        
        </div>

    )
}