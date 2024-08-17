import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './walletDatabase.db', // Specify the database file
});

export default sequelize;
