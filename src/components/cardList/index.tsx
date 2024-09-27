import { Card } from "../card";


export function CardList(){
    

    return(
        <div className="mx-24 mb-8 p-2 flex flex-col items-center">
            <h2 className="text-6xl text-center font-bold">Ofertas</h2>
            <ul className="flex flex-wrap mt-12 gap-8 justify-center ">
                <Card/>   
                <Card/>   
                <Card/>   
                <Card/>   
                <Card/>   
                 
            </ul>
        <button className="border-2 p-1 w-32 h-10 m-8 rounded-2xl border-neutral-800">Ver Mais</button>
        </div>
    )
}