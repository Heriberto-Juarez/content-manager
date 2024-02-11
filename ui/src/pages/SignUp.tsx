import { Button, Card, Input, Select, SelectItem } from '@nextui-org/react'
import bubbleImg from '/login/bubble.jpg'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import useYupValidation from '../hooks/useYupValidation';
import { usernameSchema } from '../validation/username-schema';
import { emailSchema } from '../validation/email-schema';
import { passwordSchema } from '../validation/password-schema';
import { toast } from 'react-toastify';
import api from '../axios/api';
import { AxiosError } from 'axios';
import useErrorExtractor from '../hooks/useErrorExtractor';
import { userTypeSchema } from '../validation/user-types-schema';
import OnlyGuests from '../components/OnlyGuests';
import { auth } from '../types/auth';
import { authState } from '../atoms/authAtom';
import { useRecoilState } from 'recoil';


export default function SignUp(){

    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [repeatPassword, setRepeatPassword] = useState<string>("");
    const [userTypes, setUserTypes ] = useState<string[]>([]);
    const [userType, setUserType] = useState<string>();

    const [_, setAuthItem] = useRecoilState<auth>(authState)

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const {isValid, validationErrors, setError, cleanError} = useYupValidation();
    const errorExtractor = useErrorExtractor();
    
    const  validateForm = ()=> {
        let valid = isValid([
            {
                schema: usernameSchema,
                key: 'username',
                value: username,
            },
            {
                schema: emailSchema,
                key: 'email',
                value: email,
            },
            {
                schema: passwordSchema,
                key: 'password',
                value: password,
            },
            {
                schema: passwordSchema,
                key: 'repeatPassword',
                value: password,
            },
            {
                schema: userTypeSchema,
                key: 'userType',
                value: userType
            }
        ])

        if (password != repeatPassword){
            setError('repeatPassword', 'Las contraseñas no coinciden')
            valid = false;
        }

        return valid;
    }

    const signUp = ()=>{
        setIsLoading(true);
        const isFormValid = validateForm();

        if (isFormValid){
            api.post('/user/sign-up', {
                username,
                email,
                password,
                repeatPassword,
                userType
            }).then(({data})=>{

                toast.success('Cuenta creada. Por favor espere...')
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

    useEffect(()=>{
        cleanError('username');
    }, [username])

    useEffect(()=>{
        cleanError('email');
    }, [email])

    useEffect(()=>{
        cleanError('password');
    }, [password])

    useEffect(()=>{
        cleanError('repeatPassword');
    }, [repeatPassword])

    useEffect(()=>{
        cleanError('userType');
    }, [userType])

    useEffect(()=>{
        const controller = new AbortController();
        api.get('/user/types', {signal: controller.signal}).then(({data})=>{
            setUserTypes(data)
        })
        return ()=>{
            controller.abort();
        }
    }, [])


    return <div style={{backgroundImage: `url(${bubbleImg})`}} className='min-w-[100%] min-h-[100vh] max-w-[100%]'>
        <OnlyGuests/>
        <div className='grid grid-cols-1 px-4 lg:grid-cols-4'>
            <Card className='mt-3 md:mt-9 xl:mt-16 rounded-sm lg:col-span-2 lg:col-start-2'>
                    <div className='grid grid-cols-1 lg:grid-cols-2'>
                        <div className='p-3'>
                            <h1 className=' text-3xl font-bold text-center mb-9'>Crear Cuenta</h1>
                            <div className='grid gap-3 mt-9 mb-6'>
                            <Input isInvalid={validationErrors.username != null} errorMessage={validationErrors.username} label="Username" type='email' placeholder='Nombre de usuario' isClearable value={username} onChange={(e)=>{
                                    setUsername(e.target.value)
                                }} onClear={()=>{
                                    setUsername("")
                                }} />
                                <Input isInvalid={validationErrors.email != null} errorMessage={validationErrors.email} label="Email" type='email' placeholder='correo@ejemplo.com o nombre de usuario' isClearable value={email} onChange={(e)=>{
                                    setEmail(e.target.value)
                                }} onClear={()=>{
                                    setEmail("")
                                }} />
                                <Input isInvalid={validationErrors.password != null} errorMessage={validationErrors.password} label="Contraseña" type='password' placeholder='Contraseña' value={password} onChange={(e)=>{setPassword(e.target.value)}} />
                                
                                <Input isInvalid={validationErrors.repeatPassword != null} errorMessage={validationErrors.repeatPassword} label="Repetir Contraseña" type='password' placeholder='Repetir Contraseña' value={repeatPassword} onChange={(e)=>{setRepeatPassword(e.target.value)}} />

                                <Select onChange={(e)=>{
                                    setUserType(e.target.value)
                                }} isInvalid={validationErrors.userType != null} errorMessage={validationErrors.userType} label="Tipo de usuario" placeholder='Elija su tipo de usuario'>
                                    {userTypes.map((userType : string)=>{
                                        return <SelectItem key={userType} value={userType}>
                                            {userType}
                                        </SelectItem>
                                    })}
                                </Select>

                                <Button color='primary' isLoading={isLoading} onClick={signUp} className='mt-3 mb-9'>
                                    Crear cuenta
                                </Button>
                                <div className='text-center'>
                                    ¿No tiene una cuenta? <Link to={"/login"} className='text-primary'>Ingresar</Link>
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