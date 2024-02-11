import { useRecoilValue } from "recoil";
import { auth } from "../types/auth";
import { authState } from "../atoms/authAtom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function OnlyAuth() {

    const authValue = useRecoilValue<auth>(authState);
    const navigate = useNavigate();

    useEffect(()=>{
        if (!authValue.isLogged){
            navigate('/login')
        }
    }, [authValue.isLogged])

    return null
}