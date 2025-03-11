"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const serverHealtheCheck = (_req, res, _next) => {
    return res.status(200).json({
        message: 'pong'
    });
};
exports.default = { serverHealtheCheck };
