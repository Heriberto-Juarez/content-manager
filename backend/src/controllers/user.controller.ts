import { Request, Response } from 'express'
import { UserRepository } from "../repositories/user.repository";
import { JwtService } from "../services/JwtService";
import { ValidationService } from '../services/ValidationService';
import { usernameSchema } from '../validations/username-schema';
import { emailSchema } from '../validations/email-schema';
import { passwordSchema } from '../validations/password-schema';
import { PasswordService } from '../services/PasswordService';
import { UserTypeService } from '../services/UserTypeService';
import { userTypeSchema } from '../validations/usertype-schema';
import { EValidationError } from '../errors/EValidationError';
import { IUserDb } from '../types/interfaces/IUser';
import { usernameEmailSchema } from '../validations/usernameEmail-schema';

class UserController {

    repository: UserRepository = new UserRepository();
    jwtService: JwtService = new JwtService();
    validationService = new ValidationService();
    passwordService = new PasswordService();
    userTypesService = new UserTypeService();

    constructor() {
        this.signUp = this.signUp.bind(this)
        this.listUserTypes = this.listUserTypes.bind(this)
        this.login = this.login.bind(this)
    }

    async listUserTypes(req : Request, res : Response) {
        const types = this.userTypesService.listAvailableTypes();
        res.json(types)
    }

    async sendCredentials(email : string, res : Response){
        const user = await this.repository.getByEmail(email);
        if (user == null){
            throw new Error("No se ha encontrado el usuario.");
        }
        const token = this.jwtService.getToken({
            email: user.email,
            role: user.type,
            username: user.username
        })
        res.json({
            token
        })
    }

    async signUp(req: Request, res: Response) {

        const {
            username,
            email,
            password,
            repeatPassword,
            userType
        } = req.body

        this.validationService.validate([
            {
                key: 'username', 
                value: username,
                schema: usernameSchema
            },
            {
                key: 'email', 
                value: email,
                schema: emailSchema
            },
            {
                key: 'password', 
                value: password,
                schema: passwordSchema
            },
            {
                key: 'repeatPassword', 
                value: repeatPassword,
                schema: passwordSchema
            },
            {
                key: 'userType',
                value: userType,
                schema: userTypeSchema
            }
        ]);

        if (password != repeatPassword) {
            throw new EValidationError("La contraseña y su confirmación no coinciden.");
        }

        const existsByEmail = await this.repository.existsByEmail(email);
        const existsByUsername = await this.repository.existsByUsername(username);

        if (existsByEmail) {
            throw new EValidationError("El email que se ingresó ya está en uso");
        }

        if (existsByUsername){
            throw new EValidationError("El username que se ingresó ya está en uso");
        }
        const hashedPassword = await this.passwordService.hash(password);
        await this.repository.create({
            email,
            username,
            password: hashedPassword,
            type: userType,
        })
        this.sendCredentials(email, res)
    }

    async login(req : Request, res : Response){
        const {email, password} = req.body;

        this.validationService.validate([
            {
                key: 'email', 
                value: email,
                schema: usernameEmailSchema
            },
            {
                key: 'password', 
                value: password,
                schema: passwordSchema
            },
        ])
        const byEmail = await this.repository.getByEmail(email);
        const byUsername = await this.repository.getByUsername(email);

        let user : IUserDb |null;
        if (byEmail == null && byUsername == null){
            throw new EValidationError("Credenciales invalidas");
        }
        if (byEmail != null){
            user = byEmail;
        }
        if (byUsername != null){
            user = byUsername;
        }
        const isPasswordCorrect = await this.passwordService.verify(user!.password, password);
        if (isPasswordCorrect){
            this.sendCredentials(user!.email, res)
        }else{
            throw new EValidationError("Credenciales invalidas");
        }
    }

}

export const { signUp, listUserTypes, login } = new UserController();
export default UserController