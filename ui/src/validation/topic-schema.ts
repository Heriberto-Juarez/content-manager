import { string } from "yup";

export const topicSchema = string()
    .required('La tematica es requerida')
    .min(3, 'Mínimo 3 caracteres para la temática')
    .max(50, 'Máximo 50 caracteres para la tematica')