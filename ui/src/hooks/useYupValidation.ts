/**
 * Hook para validar esquemas de yup.
 * Este hook usa yup para generar un objeto de pares de claves y valores.
 * la clave representa el nombre del campo validado
 * el valor es un string con un mensaje de error cuando hay algun problema, de lo contrario este es null o undefined.
 */

import { useEffect, useState } from 'react';
import {StringSchema, ValidationError} from 'yup'


export default function useYupValidation(){

    const [validationErrors, setValidationErrors] = useState<{[key: string]: string|null}>({});
    const [hasErrors, setHasErrors] = useState<boolean>(false);
    
    useEffect(()=>{
        setHasErrors(Object.values(validationErrors).some((value)=>typeof value == 'string'))
    }, [validationErrors])

    const cleanError = (key : string) =>{
        setValidationErrors((prev)=>{
            delete prev[key];
            return prev;
        })
    }

    const setError = (key : string, error: string) =>{
        setValidationErrors((prev)=>{
            const values = {
                ...prev
            }
            values[key] = error;
            return values;
        })
    }
    return {
        isValid(schemaItems : {
                schema: StringSchema
                value: any,
                key: string,
            }[]) : boolean{

            let isValid = true;
            schemaItems.forEach((item)=>{
                try {
                    item.schema.validateSync(item.value);
                }catch(e){
                    isValid = false;
                    let errorMessage = 'Error de validación';
                    if (e instanceof ValidationError) {
                        errorMessage = e.message;
                    }
                    setValidationErrors((prev)=>{
                        const errors = {
                            ...prev,
                        }
                        errors[item.key] = errorMessage
                        return errors;
                    })
                }
            })
            return isValid;
        },
        validationErrors,
        setValidationErrors,
        hasErrors,
        cleanError,
        setError
    }
}