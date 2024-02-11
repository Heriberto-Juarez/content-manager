import { string } from "yup";
export const usernameEmailSchema = string().required('Valor es requerido')
