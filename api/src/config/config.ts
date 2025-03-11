import dotenv from 'dotenv';

dotenv.config();

console.log("MongoDB User:", process.env.MONGO_DB_USER);
console.log("MongoDB Password:", process.env.MONGO_DB_PASSWORD ? "*****" : "Not set");

// DECLARE ALL VARIABLES
// mongodb+srv://rg360:<db_password>@cluster0.wsye1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
const MONGO_DB_USER = 'rg360';
const NODE_ENV = 'production';
const MONGO_DB_PASSWORD = 'hJUNiParQBjrpGHH';
const MONGO_URL = `mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@cluster0.wsye1.mongodb.net/?retryWrites=true&w=majority&authSource=admin&appName=Cluster0`;
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

export default config;
