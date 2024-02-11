import {
    Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure, Table,
    Skeleton,
    Card,
    CardBody,
    CardFooter,
} from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import api from "../../axios/api";
import useErrorExtractor from "../../hooks/useErrorExtractor";
import OnlyAuth from "../../components/OnlyAuth";
import { toast } from "react-toastify";

export default function Categories() {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { isOpen : isOpenDelete, onOpen : onOpenDelete, onOpenChange : onOpenChangeDelete } = useDisclosure();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [category, setCategory] = useState<string>("");
    const [categories, setCategories] = useState<{ [key: string]: string }[]>([]);

    const [deleteId, setDeleteId] = useState<string|null>(null);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    const errorExtractor = useErrorExtractor();

    const fileRef = useRef<HTMLInputElement>(null);

    const [fetching, setFetching] = useState<boolean>(true);

    const newCategory = () => {

        if (fileRef.current == null || !fileRef.current.files || fileRef.current.files?.length <= 0) {
            toast.error("Seleccione la portada");
            return;
        }

        setIsLoading(true)
        const formData = new FormData();
        const file = fileRef.current.files[0];
        formData.append('category', category)
        formData.append('file', file)
        api.post('/category', formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then(({ data }) => {
            setCategories((prev) => {
                return [
                    data,
                    ...prev,
                ]
            })
            setCategory("")
            onOpenChange();
        }).catch((e) => {
            errorExtractor.toastifyFirstError(e)
        }).finally(() => {
            setIsLoading(false);
        })
    }

    useEffect(() => {
        const controller = new AbortController();

        setFetching(true)
        api.get('/category', { signal: controller.signal }).then(({ data }) => {
            setCategories(data)
        }).finally(() => {
            setFetching(false)
        })
        return () => {
            controller.abort();
        }
    }, [])


    const askToDeleteCategory = (id : string)=>{
        setDeleteId(id)
        onOpenDelete();
    }

    const deleteCategory = ()=>{
        if(deleteId){
            setIsDeleting(true)
            api.delete('/category/' + deleteId).then(()=>{
                setCategories((prev)=>{
                    return prev.filter((category)=>{
                        return category._id != deleteId;
                    })
                })
                setDeleteId(null);
                toast.success('Categoría eliminada con éxito')
                onOpenChangeDelete();
            }).catch((e)=>{
                errorExtractor.toastifyFirstError(e)
            }).finally(()=>{
                setIsDeleting(false)
            })
        }
    }

    return <>
        <OnlyAuth />
        <div>
            <h1 className="font-bold text-3xl">Categorías</h1>
            <Button color="primary" className="mt-3" onPress={onOpen}>
                Agregar
                <FaCirclePlus />
            </Button>

            <div className="mt-3">
                {fetching ? <>
                    <Card className="w-[full] space-y-5 p-4" radius="lg">

                        <div className="space-y-3">
                            <Skeleton className="w-3/5 rounded-lg">
                                <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                            </Skeleton>
                            <Skeleton className="w-4/5 rounded-lg">
                                <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                            </Skeleton>
                            <Skeleton className="w-2/5 rounded-lg">
                                <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                            </Skeleton>
                        </div>
                    </Card>
                </> : <>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {categories.map((category, idx) => {
                            return <section key={`section-item-${idx}`}>
                                <Card key={idx}>
                                    <CardBody>
                                        <h1 className="text-2xl font-bold text-center">
                                            {category.category}
                                        </h1>
                                        <div className="flex justify-center w-[100%] h-[300px] bg-cover " style={{backgroundImage: `url(${import.meta.env.VITE_PUBLIC_API_URL}/category-pictures/${category.image})`}}>
                                        </div>
                                    </CardBody>
                                    <CardFooter className="flex justify-end">
                                        <Button color="danger" onClick={()=>{
                                            askToDeleteCategory(category._id)
                                        }}>
                                            Eliminar
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </section>
                        })}
                    </div>
                </>}
            </div>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} hideCloseButton={false} closeButton={false}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Nueva categoría</ModalHeader>
                            <ModalBody>
                                <form className="grid grid-3">
                                    <Input label="Nombre de categoría" value={category} onChange={(e) => setCategory(e.target.value)} />

                                    <div className="mt-3">
                                        <label>Portada</label>
                                        <br />
                                        <input type="file" accept="image/*" ref={fileRef} />
                                    </div>
                                </form>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose} disabled={isLoading} >
                                    Cancelar
                                </Button>
                                <Button color="primary" onPress={newCategory} isLoading={isLoading}>
                                    Crear
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

            <Modal isOpen={isOpenDelete} onOpenChange={onOpenChangeDelete} isDismissable={false} hideCloseButton={false} closeButton={false}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Eliminar categoría</ModalHeader>
                            <ModalBody>
                                <p>
                                    ¿Desea eliminar la categoría de forma permanente?
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" disabled={isDeleting} variant="light" onPress={onClose} >
                                    Cancelar
                                </Button>
                                <Button color="danger" isLoading={isDeleting}  onPress={deleteCategory}>
                                    Eliminar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

        </div>
    </>
}