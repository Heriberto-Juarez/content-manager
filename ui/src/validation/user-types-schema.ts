import { string } from "yup";

export const userTypeSchema = string().required('El tipo de usuario es requerido')