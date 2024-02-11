import {
    Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure, Table,
    Skeleton,
    Card,
    CardBody,
    Select,
    SelectItem,
    Chip,
} from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { FaCirclePlus, FaEye } from "react-icons/fa6";
import api from "../axios/api";
import useErrorExtractor from "../hooks/useErrorExtractor";
import OnlyAuth from "../components/OnlyAuth";
import { toast } from "react-toastify";
import useAuthInfo from "../hooks/useAuthInfo";

export default function Content() {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [category, setCategory] = useState<string>("");
    const [topic, setTopic] = useState<string>("");
    const [categories, setCategories] = useState<{ [key: string]: string }[]>([]);
    const [topics, setTopics] = useState<{ [key: string]: string }[]>([]);

    const [contents, setContents] = useState<{ [key: string]: string }[]>([]);

    const errorExtractor = useErrorExtractor();
    const authInfo = useAuthInfo();

    const fileRef = useRef<HTMLInputElement>(null);

    const [fetching, setFetching] = useState<boolean>(true);

    const newCategory = () => {

        if (fileRef.current == null || !fileRef.current.files || fileRef.current.files?.length <= 0) {
            toast.error("Seleccione el archivo de contenido");
            return;
        }

        setIsLoading(true)
        const formData = new FormData();
        const file = fileRef.current.files[0];

        formData.append('topic', topic)
        formData.append('category', category)
        formData.append('file', file)
        
        api.post('/content', formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then(({ data }) => {

            let categoryName : string = '';
            let topicName : string = '';


            categories.find((item)=>{
                const found = item._id == category
                if (found){
                    categoryName = `${item?.category}`;
                }
                return found;
            })
            topics.find((item)=>{
                const found = item._id == topic
                if (found){
                    topicName = `${item?.topic}`;
                }
                return found;
            })
            data.category = {
                category: categoryName
            }
            data.topic = {
                topic: topicName,
            }

            setContents((prev) => {
                return [
                    data,
                    ...prev,
                ]
            })
            setTopic("");
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
        api.get('/topic', { signal: controller.signal }).then(({ data }) => {
            setTopics(data)
        }).finally(() => {
        })
        api.get('/content', { signal: controller.signal }).then(({ data }) => {
            setContents(data)
        }).finally(() => {
        })
        return () => {
            controller.abort();
        }
    }, [])
    const getFileExtension = (url : string) : string => {
        const parts = url.split('.');
        return parts[parts.length - 1].toLowerCase();
      };
    const renderContent = (fullFileName : string) => {
        const extension = getFileExtension(fullFileName);
        if (extension === 'jpg' || extension === 'jpeg' || extension === 'png' || extension === 'gif') {
          return <img src={fullFileName} alt="Image" className="max-w-[100%] max-h-[200px]" />;
        } else if (extension === 'mp4' || extension === 'webm' || extension === 'avi') {
          return <video className="max-h-[200px]" controls><source src={fullFileName} type={`video/${extension}`} />Your browser does not support the video tag.</video>;
        } else if (extension === "txt") {
          // Default case, just display a link
          return "Archivo de texto pendiente";
        }else{
            return `Extensión aún no soportada: (${extension})`
        }
      };
    return <>
        <OnlyAuth />
        <div>
            <h1 className="font-bold text-3xl">Contenido</h1>
            {authInfo.isCreator ? <Button color="primary" className="mt-3" onPress={onOpen}>
                Agregar
                <FaCirclePlus />
            </Button> : <>
                <p className="flex items-center gap-2 text-gray-500">
                    Solo modo lectura <FaEye/>
                </p>
            </>}

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
                        {contents.map((content, idx) => {
                            return <section key={`section-item-${idx}`}>
                                <Card key={idx}>
                                    <CardBody>
                                        <div className="flex justify-center items-center min-h-[300px] max-h-[300px]">
                                            {renderContent(`${import.meta.env.VITE_PUBLIC_API_URL}/content/${content.content}`)}
                                        </div>
                                        <div>
                                            <div className="flex gap-3">
                                                <div>
                                                <b>Categoría: </b> <br/><Chip>
                                                {content?.category?.category}
                                                </Chip>
                                                </div>
                                                <div>
                                                <b>Tematica: </b> <br/>
                                                <Chip color="primary">
                                                {content?.topic?.topic}
                                                </Chip>
                                                </div>
                                            </div>
                                            <p className="mt-3">
                                                <b>Créditos:</b> {content?.owner?.username}
                                            </p>
                                        </div>
                                    </CardBody>
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
                            <ModalHeader className="flex flex-col gap-1">Agregar contenido</ModalHeader>
                            <ModalBody>
                                <form className="grid grid-3">
                                    <Select label="Categoría" value={category} onChange={(e)=>{
                                        setCategory(e.target.value)
                                    }}>
                                        {categories.map((category)=>{
                                            return <SelectItem key={category._id}>
                                                {category.category}
                                            </SelectItem>
                                        })}
                                    </Select>
                                    <Select className="mt-3" label="Tematica" value={topic} onChange={(e)=>{
                                        setTopic(e.target.value)
                                    }}>
                                        {topics.map((topic)=>{
                                            return <SelectItem key={topic._id}>
                                                {topic.topic}
                                            </SelectItem>
                                        })}
                                    </Select>           
                                    <div className="mt-3">
                                        <label>Archivo</label>
                                        <br />
                                        <input type="file" accept="image/*, video/*, .txt" ref={fileRef} />
                                    </div>
                                </form>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose} disabled={isLoading} >
                                    Cancelar
                                </Button>
                                <Button color="primary" onPress={newCategory} isLoading={isLoading}>
                                    Agregar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>


        </div>
    </>
}