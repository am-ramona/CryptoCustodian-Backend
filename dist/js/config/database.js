"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const path_1 = __importDefault(require("path"));
// Initialize Sequelize with SQLite
const sequelize = new sequelize_1.Sequelize({
    dialect: 'sqlite',
    storage: path_1.default.resolve(__dirname, 'data', 'walletTransactionsDatabase.sqlite'), // Absolute path to the SQLite file
    //   storage: 'database.sqlite3', // Path to your SQLite database file
    logging: (msg) => console.log(`Sequelize Log: ${msg}`), // Custom logging function
});
// const sequelize = new Sequelize('sqlite::memory:'); // Example for SQLite
// Initialize Sequelize with SQLite : Passing parameters separately (other dialects)
// const sequelize = new Sequelize('database', 'username', 'password', {
//   host: 'localhost',
//   dialect: 'sqlite'
// });
// module.exports = sequelize;
// Test the connection
sequelize.authenticate()
    .then(() => {
    console.log('Connection has been established successfully.');
})
    .catch(err => {
    console.error('Unable to connect to the database:', err);
});
exports.default = sequelize;
