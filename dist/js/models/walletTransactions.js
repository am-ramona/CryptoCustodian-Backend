"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
// const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = new Sequelize('sqlite::memory:'); // For in-memory database
const Transaction = database_1.default.define('walletTransactionsDatabase', {
    tokenSymbol: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: false
        }
    },
    value: sequelize_1.DataTypes.FLOAT || sequelize_1.DataTypes.STRING,
    timestamp: sequelize_1.DataTypes.DATE || sequelize_1.DataTypes.STRING,
    from: sequelize_1.DataTypes.STRING,
    to: sequelize_1.DataTypes.STRING,
    tokenName: sequelize_1.DataTypes.STRING,
    tokenDecimal: sequelize_1.DataTypes.STRING,
    gasUsed: sequelize_1.DataTypes.STRING,
    gasPrice: sequelize_1.DataTypes.STRING,
    input: sequelize_1.DataTypes.STRING,
}
// , {
//   // Model options
//   tableName: 'transactions',
//   timestamps: true,
//   hooks: {
//       afterCreate: (instance) => {
//           console.log(`Transaction created: ${JSON.stringify(instance.toJSON())}`);
//       }
//   }
// }
);
// class Transaction extends Model {
//   public id!: number;
//   public from!: string;
//   public to!: string;
//   public value!: string;
//   public tokenName!: string;
//   public tokenSymbol!: string;
//   public tokenDecimal!: string;
//   public gasUsed!: string;
//   public gasPrice!: string;
//   public timeStamp!: string;
//   public input!: string;
// }
// Transaction.init({
//   from: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   to: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   value: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   tokenName: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   tokenSymbol: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   tokenDecimal: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   gasUsed: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   gasPrice: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   timeStamp: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   input: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
// }, {
//   sequelize,
//   modelName: 'Transaction',
// });
exports.default = Transaction;
