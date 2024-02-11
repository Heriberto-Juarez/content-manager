import { string } from "yup";
export const passwordSchema = string().required('La contraseña es requerida').min(8,'La contraseña debe tener al menos 8 caracteres');
