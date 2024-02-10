import {Button} from "@nextui-org/react";
import NotFoundImg from "/img/not-found.jpg"
import { CiHome } from "react-icons/ci";
import { Link } from "react-router-dom";

export default function NotFound(){

    return <>
        <main className="grid grid-cols-1">
            <div className="gap-4 grid">
                <p className="text-center text-6xl font-bold">
                    Oooops!
                </p>
                <div className="flex justify-center">
                    <img src={NotFoundImg} alt="Not Found" width={300} />
                </div>
                <h1 className="text-4xl text-center">
                    Error <b>404</b> - Página No Encontrada
                </h1>
                <div className="flex justify-center">
                    <Link to="/">                   
                    <Button color="primary">
                        <CiHome/>
                        Ir a Inicio
                    </Button>
                    </Link>
                </div>
            </div>

        </main>
    </>
}