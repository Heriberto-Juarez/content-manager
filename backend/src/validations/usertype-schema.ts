import { string } from "yup";
import { UserTypeService } from "../services/UserTypeService";

const userTypeService = new UserTypeService();

const userTypes = userTypeService.listAvailableTypes();

export const userTypeSchema = string().required('El tipo de usuario es requerido').oneOf(userTypes,`El valor para el tipo de usuario no es valido. Solo se permite: ${userTypes.join(', ')}`);