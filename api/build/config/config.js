"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// DECLARE ALL VARIABLES
const MONGO_DB_USER = process.env.MONGO_DB_USER || 'peptonibibiloni';
const NODE_ENV = process.env.NODE_ENV || 'production';
const MONGO_DB_PASSWORD = process.env.MONGO_DB_PASSWORD || 'Peptoni1999';
const MONGO_URL = `mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@cluster0.wsye1.mongodb.net/`;
const MONGO_URL_LOCAL = `mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@cluster0.wsye1.mongodb.net/`;
const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 3000;
// CREATE CONFIG OBJECT
const config = {
    mongo: {
        url: MONGO_URL, // No need to include a port number here for MongoDB Atlas
    },
    server: {
        hostname: SERVER_HOSTNAME,
        port: SERVER_PORT
    },
};
// CHECK FOR ENVIRONMENT
if (NODE_ENV === 'production') {
    config.mongo.url = MONGO_URL;
    config.server.port = SERVER_PORT;
    config.server.hostname = SERVER_HOSTNAME;
}
else if (NODE_ENV === 'local') {
    config.mongo.url = MONGO_URL_LOCAL;
    config.server.port = SERVER_PORT;
    config.server.hostname = SERVER_HOSTNAME;
}
exports.default = config;
//# sourceMappingURL=config.js.map