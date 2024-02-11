import { jwtDecode } from "jwt-decode";
import { useRecoilValue } from "recoil";
import { auth } from "../types/auth";
import { authState } from "../atoms/authAtom";
import { useEffect, useState } from "react";


export default function useAuthInfo(){

    const authValue = useRecoilValue<auth>(authState);
    const [role, setRole] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [isCreator, setIsCreator] = useState<boolean>(false);
    const [isReader, setIsReader] = useState<boolean>(false);


    useEffect(()=>{
        if (authValue.token){
            const decoded = jwtDecode(authValue.token) as {role: string; username: string;};
            setRole(decoded.role)
            setUsername(decoded.username)
            if (decoded.role == 'Administrador'){
                setIsAdmin(true);
            }else if (decoded.role == 'Creador'){
                setIsCreator(true);
            }else {
                setIsReader(true);
            }
        }
    }, [authValue])

    return {
        role,
        username,
        isAdmin,
        isReader,
        isCreator
    }
}