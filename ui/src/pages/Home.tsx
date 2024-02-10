import multimedia from '/landing/multimedia.jpg'
import multimediaIncrease from '/landing/increase.jpg'

import { Button, Card, CardBody } from '@nextui-org/react'
import { MdCategory, MdSave, MdSearch } from 'react-icons/md'
import { GrFormNextLink } from 'react-icons/gr'
import { Link } from 'react-router-dom'

export default function Home() {

    return <div className="w-full min-h-[100vh]">
        <div className="grid grid-cols-1 md:grid-cols-2">

            <div className='bg-[#ae87fc]  min-h-[100vh] py-10 px-6 p-3'>
                <div className='grid gap-6'>
                    <h1 className="text-5xl htitle text-[#d1c9d8] text-center">
                        Administra tu <br />
                        <span className='font-bold text-stone-800'>contenido multimedia</span>
                    </h1>
                    <div className='flex justify-center'>
                        <img src={multimedia} alt='Laptop / Multimedia' width={600} />
                    </div>
                    <p className='text-center text-2xl text-[#d1c9d8]'>
                        Tus fotos, vídeos y archivos de texto en un solo lugar, organizados para que puedas encontrarlos fácilmente
                    </p>
           
                </div>

            </div>
            <div className=' text-center bg-gradient-to-br py-10 px-6 p-3'>
                <div className='grid gap-6'>
                    <h2 className='font-bold htitle text-6xl'>
                        Tu contenido en otro nivel
                    </h2>
                    <div className='flex justify-center'>
                        <img src={multimediaIncrease} alt='Laptop / Multimedia' width={300} className='rounded-lg' />
                    </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-9 gap-3'>
                    {[{

                    }].map(()=>{
                        return <Card className='bg-[#e4defc] shadow-md'>
                        <CardBody className='grid gap-3'>
                            <p className='text-center text-xl'>
                                Crea categorías
                            </p>
                            <div className='flex justify-center'>
                            <MdCategory size={50} className='text-cyan-700'/>
                            </div>
                            <p className='text-center'>
                                Te permite organizar tu contenido de forma sencilla
                            </p>
                        </CardBody>
                    </Card>
                    })}
                    <Card className='bg-[#e4defc] shadow-md'>
                        <CardBody className='grid gap-3'>
                            <p className='text-center text-xl'>
                                Almacenamiento ilimitado
                            </p>
                            <div className='flex justify-center'>
                            <MdSave size={50} className='text-cyan-700' />
                            </div>
                            <p className='text-center'>
                                Guarda contenido sin límites ni restricciones
                            </p>
                        </CardBody>
                    </Card>
                    <Card className='bg-[#e4defc] shadow-md'>
                        <CardBody className='grid gap-3'>
                            <p className='text-center text-xl'>
                                Buscador incorporado
                            </p>
                            <div className='flex justify-center'>
                            <MdSearch size={50} className='text-cyan-700' />
                            </div>
                            <p className='text-center'>
                                Te permite encontrar tu información fácilmente
                            </p>
                        </CardBody>
                    </Card>
                </div>
                <div className='flex justify-center'>
                        <Link to="/login">
                        <Button color='primary' size='lg' variant='shadow' >
                            ¡Pruebalo Ahora! <GrFormNextLink/>
                        </Button>
                        </Link>
                    </div>
            </div>
        </div>

    </div>
}
