"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    let status = 500;
    res.status(status).json({});
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error-handler.js.map