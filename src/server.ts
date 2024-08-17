import { createServer, IncomingMessage, ServerResponse } from 'http'
import express, { Express, Request, Response } from 'express'
import sequelize from './config/database' // Import your Sequelize instance
import Transaction from './models/walletTransactions'  // Import your models
import dotenv from 'dotenv'
import cors from "cors"
import walletTransactionsRoutes from "./routes"
import { getWalletTransactions } from './controllers/walletTransactions'

dotenv.config();

const PORT: string | number = process.env.PORT || 4000

const app: Express = express();

app.use(cors())
app.use(express.json())
// app.use(express.urlencoded({ extended: true }))
app.use(walletTransactionsRoutes)

// Catch-all route to handle undefined routes
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'API route not found' });
});

// Create a server and pass Express app to handle requests
// const server = createServer((req: IncomingMessage, res: ServerResponse) => {
//   // app(req as Request, res as Response);
//   app.handle(req, res); 
// });

app.get('/wallet-transactions', getWalletTransactions);

import db from './models/walletTransactions';
db.sequelize?.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`db sync, Server running on http://localhost:${PORT}`);
});

})

// Sync models and start server
const startServer = async () => {
  try {
      // Synchronize all defined models to the DB
      await sequelize.sync({ alter: true });
      console.log('Database synced');

      // Start the server
      app.listen(PORT, () => {
          console.log(`Server running on http://localhost:${PORT}`);
      });
  } catch (error) {
      console.error('Unable to sync database:', error);
  }
};

// startServer();