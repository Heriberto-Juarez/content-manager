import { string } from "yup";

export const usernameSchema = string().required('El nombre de usuario es requerido').min(3).max(20).matches(/^[a-zA-Z0-9_]*$/, 'El nombre de usuario solo puede contener letras, números y guiones bajos.')
