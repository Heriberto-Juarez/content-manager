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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const error_handler_1 = require("./middlewares/error-handler");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const user_route_1 = __importDefault(require("./routes/user.route"));
require("express-async-errors");
dotenv_1.default.config();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        app.use((0, cors_1.default)());
        app.use(body_parser_1.default.urlencoded({ extended: true }));
        app.use(body_parser_1.default.json());
        const port = process.env.PORT || 3000;
        const mongoConnectionString = process.env.MONGO_DB_CONNECTION;
        if (typeof mongoConnectionString != 'string') {
            throw new Error("El string de conexión de MongoDB no contiene un valor.");
        }
        yield mongoose_1.default.connect(mongoConnectionString);
        /**
         * Routes. TODO: Mejorar este código para importar las rutas de forma automática.
         */
        app.use('/user', user_route_1.default);
        app.use(error_handler_1.errorHandler);
        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        });
    });
}
main();
//# sourceMappingURL=app.js.map