import jwt from 'jsonwebtoken'
import { jwtDecode } from 'jwt-decode';

interface JwtTokenData{ 
    username: string;
    email: string;
    role: string;
}

export class JwtService {

    secret : string = '';

    constructor(){
        const secretEnv = process.env.JWT_SECRET
        if (typeof secretEnv != 'string') {
            throw new Error('El secreto del JWT no está definido en las variables de entorno.');
        }
        this.secret = secretEnv;
    }

    getToken(data : JwtTokenData ){
        return jwt.sign(data, this.secret, {
            expiresIn: '30d' // para mejorar la seguridad hay que reducir el tiempo (tal vez 5 minutos) del token pero también será necesario refrescar tokens. 
            // solo por motivos de tiempo y sabiendo que esto no va a producción se dejo un tiempo "largo"
        })
    }

    verifyToken(token : string){
        return new Promise((resolve, reject)=>{
            jwt.verify(token, this.secret, function(err){
                resolve(err == null)
            })
        })
    }

    decodeToken(token : string) {
        const decoded = jwtDecode(token)
        return decoded
    }

}