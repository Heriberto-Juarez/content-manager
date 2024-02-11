

import { useRecoilValue } from "recoil";
import { auth } from "../../types/auth";
import { authState } from "../../atoms/authAtom";
import { Card, CardBody } from "@nextui-org/react";
import { Link } from "react-router-dom";
import useAuthInfo from "../../hooks/useAuthInfo";

export default function Dashboard() {

    const data = useRecoilValue<auth>(authState);
    const info = useAuthInfo();

    return <>
        <div className="grid grid-cols-2">
            {data.isLogged ? <>

                {info.isAdmin && <></>}

                {info.isCreator || info.isReader ? <>
                    <Link to={"/dashboard/content"}>
                <Card>
                    <CardBody>
                        <h3 className="text-2xl font-bold text-center">
                            Contenido
                        </h3>
                    </CardBody>
                </Card>
            </Link>

                </> : <>
                </>}

            </> : <>
                <p className="text-center">
                    Contenido de usuarios no registrados no disponible.
                </p>
            </>}
        </div>
    </>
}