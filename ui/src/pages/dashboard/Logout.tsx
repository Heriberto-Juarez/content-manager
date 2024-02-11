import { Spinner } from "@nextui-org/react";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { authState } from "../../atoms/authAtom";
import { auth } from "../../types/auth";
import { useNavigate } from "react-router-dom";


export default function Logout() {

    const [_, setAuthState] = useRecoilState<auth>(authState);
    const navigate = useNavigate();

    useEffect(()=>{
        setAuthState({
            isLogged: false,
            refreshToken: null,
            role: null,
            token: null,
        })
        navigate('/')
    }, [])

    return <>
            <h1 className="text-center text-3xl mt-6 font-bold ">Cerrando sesión...</h1>
        
        <div className="flex justify-center my-7">
            <Spinner size="lg" />
        </div>
    </>
}