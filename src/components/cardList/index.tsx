import { Card } from "../card";


export function CardList(){
    

    return(
        <div className="bg-zinc-500 mx-56 mb-8 p-4">
            <h2 className="text-6xl text-center font-bold">Ofertas</h2>
            <ul>
                <Card/>   


            </ul>

        </div>
    )
}