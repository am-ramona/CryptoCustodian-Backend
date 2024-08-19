import express, { Express, Request, Response } from 'express';
import sequelize from './config/database';
import walletTransactionsRoutes from "./routes";
import { getWalletTransactions } from './controllers/walletTransactions';
import dotenv from 'dotenv';
import cors from "cors";

dotenv.config();

const PORT: string | number = process.env.PORT || 4000;

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(walletTransactionsRoutes);

// Define routes
app.get('/wallet-transactions', getWalletTransactions);

// Catch-all route to handle undefined routes
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'API route not found' });
});

// Sync models
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

// Start server
startServer();