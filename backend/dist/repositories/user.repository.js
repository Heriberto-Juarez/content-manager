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
exports.UserRepository = void 0;
const User_1 = require("../models/User");
class UserRepository {
    getByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User_1.User.findOne({ email: email });
        });
    }
    getByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User_1.User.findOne({ username: username });
        });
    }
    existsByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getByEmail(email) != null;
        });
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = new User_1.User({
                username: user.username,
                email: user.email,
                password: user.password,
            });
            yield newUser.save();
        });
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map