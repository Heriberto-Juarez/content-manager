import {
    Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure, Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
    Skeleton,
    Card,
    Select,
    SelectItem
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import api from "../../axios/api";
import useErrorExtractor from "../../hooks/useErrorExtractor";
import useYupValidation from "../../hooks/useYupValidation";
import { topicSchema } from "../../validation/topic-schema";
import { topicTypesSchema } from "../../validation/topicTypes-schema";
import { toast } from "react-toastify";
import OnlyAuth from "../../components/OnlyAuth";


export default function Topics() {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [topic, setTopic] = useState<string>("");
    const [topics, setTopics] = useState<{ [key: string]: string }[]>([]);
    const [topicTypes, setTopicTypes] = useState<{ [key: string]: string }[]>([]);

    const errorExtractor = useErrorExtractor();

    const [fetchingTypes, setFetchingTypes] = useState<boolean>(false);
    const [fetching, setFetching] = useState<boolean>(true);

    const [values, setValues] = useState<Set<string>>(new Set([]));


    const { isValid, validationErrors, cleanError } = useYupValidation();

    useEffect(()=>{
        cleanError('topicTypes');
    }, [values])

    useEffect(()=>{
        cleanError('topic')
    }, [topic])

    const newTopic = () => {
        setIsLoading(true)

        const valid = isValid([
            {
                key: 'topic',
                value: topic,
                schema: topicSchema
            },
            {
                key: 'topicTypes',
                value: Array.from(values).join(";"),
                schema: topicTypesSchema
            }
        ])

        if (valid){
            api.post('/topic', {
                topic: topic,
                allowedTypes: Array.from(values).join(";"),
            }).then(({ data }) => {
                toast.success('Tematica agregada con éxito!')
                setTopics((prev) => {
                    return [
                        data,
                        ...prev,
                    ]
                })
                setTopic("")
                onOpenChange();
            }).catch((e) => {
                errorExtractor.toastifyFirstError(e)
            }).finally(() => {
                setIsLoading(false);
            })
        }else {
            setIsLoading(false)
        }


    }

    useEffect(() => {
        const controller = new AbortController();

        setFetchingTypes(true)
        api.get('/topic/types', { signal: controller.signal }).then(({ data }) => {
            setTopicTypes(data)
        }).finally(() => {
            setFetchingTypes(false);
        })

        setFetching(true)
        api.get('/topic', { signal: controller.signal }).then(({ data }) => {
            setTopics(data)
        }).finally(() => {
            setFetching(false)
        })

        return () => {
            controller.abort();
        }
    }, [])

    return <>
        <div>
            <OnlyAuth/>
            <h1 className="font-bold text-3xl">Tematicas</h1>
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
                    <Table aria-label="Example static collection table" className="w-full">
                        <TableHeader>
                            <TableColumn>Tematica</TableColumn>
                            <TableColumn>Permisos de contenidos</TableColumn>

                        </TableHeader>
                        <TableBody>
                            {topics.map((topic, idx) => {
                                return <TableRow key={idx}>
                                    <TableCell>{topic.topic}</TableCell>
                                    <TableCell>{topic.humanReadableTypes}</TableCell>
                                </TableRow>
                            })}

                        </TableBody>
                    </Table>
                </>}
            </div>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} hideCloseButton={false} closeButton={false}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Nueva tematica</ModalHeader>
                            <ModalBody>
                                <form className="grid gap-3">
                                    <Input isInvalid={validationErrors.topic != null} errorMessage={validationErrors.topic} label="Nombre de tematica" value={topic} onChange={(e) => setTopic(e.target.value)} />
                                    <Select
                                            label="Tipos permitidos (Mulltiples)"
                                            selectedKeys={values}
                                            selectionMode="multiple"
                                            onSelectionChange={setValues}
                                            isInvalid={validationErrors.topicTypes != null} 
                                            errorMessage={validationErrors.topicTypes}
                                        >
                                                {
                                                    topicTypes.map((topicType, idx)=>{
                                                        return <SelectItem key={topicType.key} value={topicType.name}  >
                                                            {topicType.name}
                                                        </SelectItem>
                                                    })
                                                }
                                        </Select>
                                </form>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose} disabled={isLoading} >
                                    Cancelar
                                </Button>
                                <Button color="primary" onPress={newTopic} isLoading={isLoading}>
                                    Crear
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

        </div>
    </>
}