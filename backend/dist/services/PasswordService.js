"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
class PasswordService {
    hash(password) {
        return new Promise((resolve, reject) => {
            bcrypt_1.default.genSalt(10, function (err, salt) {
                if (err) {
                    reject();
                }
                else {
                    bcrypt_1.default.hash(password, salt, function (err, hash) {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(hash);
                        }
                    });
                }
            });
        });
    }
    verify(passwordHash, plainPassword) {
        return new Promise((resolve, reject) => {
            bcrypt_1.default.compare(plainPassword, passwordHash, function (_, result) {
                resolve(result);
            });
        });
    }
}
exports.PasswordService = PasswordService;
//# sourceMappingURL=PasswordService.js.map