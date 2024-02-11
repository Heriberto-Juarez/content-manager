import { string } from "yup";
export const emailSchema = string().required('El email es requerido').email('Debe ser un email valido');
