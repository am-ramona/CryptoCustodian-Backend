import { DataTypes, Sequelize, Model } from 'sequelize';
import sequelize from '../config/database';
// const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = new Sequelize('sqlite::memory:'); // For in-memory database

const Transaction = sequelize.define('walletTransactionsDatabase', {
  tokenSymbol:{
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      notEmpty: false
    }
  },
  value: DataTypes.FLOAT || DataTypes.STRING,
  timestamp: DataTypes.DATE || DataTypes.STRING,
  from: DataTypes.STRING,
  to: DataTypes.STRING,
  tokenName: DataTypes.STRING,
  tokenDecimal: DataTypes.STRING,
  gasUsed: DataTypes.STRING,
  gasPrice:DataTypes.STRING,
  input:DataTypes.STRING,
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

export default Transaction;
