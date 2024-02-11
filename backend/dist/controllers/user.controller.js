"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const user_repository_1 = require("../repositories/user.repository");
const JwtService_1 = require("../services/JwtService");
const ValidationService_1 = require("../services/ValidationService");
const username_schema_1 = require("../validations/username-schema");
const email_schema_1 = require("../validations/email-schema");
const password_schema_1 = require("../validations/password-schema");
class UserController {
    constructor() {
        this.repository = new user_repository_1.UserRepository();
        this.jwtService = new JwtService_1.JwtService();
        this.validationService = new ValidationService_1.ValidationService();
        this.login = this.login.bind(this);
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, email, password, repeatPassword, } = req.body;
            this.validationService.validate([
                {
                    key: 'username',
                    value: username,
                    schema: username_schema_1.usernameSchema
                },
                {
                    key: 'email',
                    value: email,
                    schema: email_schema_1.emailSchema
                },
                {
                    key: 'password',
                    value: password,
                    schema: password_schema_1.passwordSchema
                },
                {
                    key: 'repeatPassword',
                    value: repeatPassword,
                    schema: repeatPassword
                }
            ]);
            if (password != repeatPassword) {
                throw new Error("La contraseña y su confirmación no coinciden.");
            }
            res.json({
                yo: 'yo'
            });
        });
    }
}
exports.login = new UserController().login;
exports.default = UserController;
//# sourceMappingURL=user.controller.js.map