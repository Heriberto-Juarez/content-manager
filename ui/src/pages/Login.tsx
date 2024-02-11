import { Button, Card, Input } from '@nextui-org/react'
import bubbleImg from '/login/bubble.jpg'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import useYupValidation from '../hooks/useYupValidation';
import api from '../axios/api';
import { AxiosError } from 'axios';
import useErrorExtractor from '../hooks/useErrorExtractor';
import { toast } from 'react-toastify';
import { emailUsernameSchema } from '../validation/email-username-schema';
import { passwordSchema } from '../validation/password-schema';


import { authState } from '../atoms/authAtom'
import { auth } from '../types/auth';
import { useRecoilState } from 'recoil';
import OnlyGuests from '../components/OnlyGuests';

export default function Login(){

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const {isValid, validationErrors, cleanError} = useYupValidation();
    const [authItem, setAuthItem] = useRecoilState<auth>(authState)

    const errorExtractor = useErrorExtractor();

    const validateForm = ()=>{
        let valid = isValid([
            {
                schema: emailUsernameSchema,
                key: 'email',
                value: email,
            },
            {
                schema: passwordSchema,
                key: 'password',
                value: password,
            },
        ])
        return valid;
    }

    useEffect(()=>{
        cleanError('email');
    }, [email])

    useEffect(()=>{
        cleanError('password');
    }, [password])

    const login = ()=>{
        setIsLoading(true);
        const isFormValid = validateForm();
        if (isFormValid){
            api.post('/user/login', {
                email,
                password,
            }).then(({data})=>{
                toast.success('Autorizado. Por favor espere...')
                setAuthItem({
                    isLogged: true,
                    refreshToken: null,
                    role: null,
                    token: data.token
                })
            }).catch((e : AxiosError)=>{
                errorExtractor.toastifyFirstError(e);
            }).finally(()=>{
                setIsLoading(false);
            })
        }else{
            setIsLoading(false)
            toast.error("El formulario contiene datos invalidos.");
        }
    }

    return <div style={{backgroundImage: `url(${bubbleImg})`}} className='min-w-[100%] min-h-[100vh] max-w-[100%]'>
        <OnlyGuests/>
        <div className='grid grid-cols-1 px-4 lg:grid-cols-4'>
            <Card className='mt-3 md:mt-9 xl:mt-16 rounded-sm lg:col-span-2 lg:col-start-2'>
                    <div className='grid grid-cols-1 lg:grid-cols-2'>
                        <div className='p-3'>
                            <h1 className=' text-3xl font-bold text-center mb-9'>Ingresar</h1>
                            <div className='grid gap-3 mt-9 mb-6'>
                            <Input isInvalid={validationErrors.email != null} errorMessage={validationErrors.email} label="Email" type='text' placeholder='correo@ejemplo.com o nombre de usuario' isClearable value={email} onChange={(e)=>{
                                    setEmail(e.target.value)
                                }} onClear={()=>{
                                    setEmail("")
                                }} />
                                <Input isInvalid={validationErrors.password != null} errorMessage={validationErrors.password} label="Contraseña" type='password' placeholder='Contraseña' value={password} onChange={(e)=>{setPassword(e.target.value)}} />
                                <Button color='primary' isLoading={isLoading} onClick={login} className='mt-3 mb-9'>
                                    Ingresar
                                </Button>
                                <div className='text-center'>
                                    ¿No tiene una cuenta? <Link to={"/sign-up"} className='text-primary'>Registrarse</Link>
                                </div>
                            </div>
                        </div>
                        <div className='hidden lg:flex'>
                            <div className='flex justify-center items-center w-full'>
                            <img src='/login/media.jpg' width={300}/>
                            </div>
                        </div>
                    </div>
            </Card>
        </div>
    </div>
}