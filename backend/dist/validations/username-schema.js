"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usernameSchema = void 0;
const yup_1 = require("yup");
exports.usernameSchema = (0, yup_1.string)().required('El nombre de usuario es requerido').min(3).max(20).matches(/^[a-zA-Z0-9_]*$/, 'El nombre de usuario solo puede contener letras, números y guiones bajos.');
//# sourceMappingURL=username-schema.js.map