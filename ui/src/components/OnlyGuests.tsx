import { useRecoilValue } from "recoil";
import { auth } from "../types/auth";
import { authState } from "../atoms/authAtom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function OnlyGuests() {

    const authValue = useRecoilValue<auth>(authState);
    const navigate = useNavigate();

    useEffect(()=>{
        if (authValue.isLogged){
            navigate('/dashboard')
        }
    }, [authValue.isLogged])

    return null
}