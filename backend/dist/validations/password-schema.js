"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordSchema = void 0;
const yup_1 = require("yup");
exports.passwordSchema = (0, yup_1.string)().required('La contraseña es requerida').min(8, 'La contraseña debe tener al menos 8 caracteres');
//# sourceMappingURL=password-schema.js.map