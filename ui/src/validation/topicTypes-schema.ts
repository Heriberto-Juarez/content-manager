import { string } from "yup";

export const topicTypesSchema = string()
    .required('Los archivos permitidos son requeridos.')
    .max(200, 'Demasiado grande')