"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailSchema = void 0;
const yup_1 = require("yup");
exports.emailSchema = (0, yup_1.string)().required('El email es requerido').email('Debe ser un email valido');
//# sourceMappingURL=email-schema.js.map