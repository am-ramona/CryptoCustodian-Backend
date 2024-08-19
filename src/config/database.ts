import { Sequelize, DataTypes } from 'sequelize';
import path from 'path';

// Initialize Sequelize with SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.resolve(__dirname, 'data', 'walletTransactionsDatabase.sqlite'), // Absolute path to the SQLite file
//   storage: 'database.sqlite3', // Path to your SQLite database file
  logging: (msg) => console.log(`Sequelize Log: ${msg}`), // Custom logging function
});

// Or const sequelize = new Sequelize('sqlite::memory:'); // Example for SQLite

// Or Initialize Sequelize with SQLite : Passing parameters separately (other dialects)
// const sequelize = new Sequelize('database', 'username', 'password', {
//   host: 'localhost',
//   dialect: 'sqlite'
// });

// Test the connection
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

export default sequelize;
