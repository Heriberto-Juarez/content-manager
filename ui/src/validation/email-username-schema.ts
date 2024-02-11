import { string } from "yup";

export const emailUsernameSchema = string().required('Valor requerido');