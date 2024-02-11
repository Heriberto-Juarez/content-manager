import { User } from "../models/User";
import { IUser, IUserDb } from "../types/interfaces/IUser";

export class UserRepository {

    async getByEmail(email : string) : Promise<IUserDb|null>{
        return await User.findOne({email: email});
    }

    async getByUsername(username: string) : Promise<IUserDb|null>{
        return await User.findOne({username: username})
    }

    async existsByEmail(email : string) : Promise<boolean>{
        return (await this.getByEmail(email)) != null;
    }

    async existsByUsername(username: string) : Promise<boolean> {
        return (await this.getByUsername(username)) != null
    }

    async create(user : IUser){
        const newUser = new User({
            username: user.username,
            email: user.email,
            password: user.password,
            type: user.type
        });
        await newUser.save();
    }

}