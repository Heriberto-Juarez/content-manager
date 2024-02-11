import { AxiosError } from "axios"
import { toast } from "react-toastify";

export default function useErrorExtractor() {


    const extractErrors = (error: AxiosError | Error)=> {
        let extractedErrors : string[] = [];
        if (error instanceof AxiosError) {
            if (![400, 500].includes(error.status || 0)) {
                extractedErrors.push(error.message)
            }
            if (Array.isArray(error.response?.data?.errors)) {
                const message = error.response.data.message;
                if (typeof message == 'string') {
                    extractedErrors.push(message);
                }
                error.response.data.errors.forEach((currentError: { field: string, message: string, }) => {
                    extractedErrors.push(currentError.message)
                });
            }
        }

        return extractedErrors;
    }

    const toastifyFirstError = (error: AxiosError | Error) => {
        const errors = extractErrors(error);
        if (errors.length > 1) {
            toast.error(errors[1])
        }else if(errors.length > 0) {
            toast.error(errors[0])
        } else {
            toast.error(error.message)
        }
    }

    return {
        extractErrors,
        toastifyFirstError
    }
}