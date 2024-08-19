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
, {
  // Model options
  tableName: 'walletTransactionsDatabase',
  timestamps: true,
  hooks: {
      afterCreate: (instance) => {
          console.log(`Transaction created: ${JSON.stringify(instance.toJSON())}`);
      }
  }
}
);

export default Transaction;
