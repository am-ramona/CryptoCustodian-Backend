"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./config/database")); // Import your Sequelize instance
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const walletTransactions_1 = require("./controllers/walletTransactions");
dotenv_1.default.config();
const PORT = process.env.PORT || 4000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// app.use(express.urlencoded({ extended: true }))
app.use(routes_1.default);
// Catch-all route to handle undefined routes
app.use((req, res) => {
    res.status(404).json({ message: 'API route not found' });
});
// Create a server and pass Express app to handle requests
// const server = createServer((req: IncomingMessage, res: ServerResponse) => {
//   // app(req as Request, res as Response);
//   app.handle(req, res); 
// });
app.get('/wallet-transactions', walletTransactions_1.getWalletTransactions);
const walletTransactions_2 = __importDefault(require("./models/walletTransactions"));
(_a = walletTransactions_2.default.sequelize) === null || _a === void 0 ? void 0 : _a.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`db sync, Server running on http://localhost:${PORT}`);
    });
});
// Sync models and start server
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Synchronize all defined models to the DB
        yield database_1.default.sync({ alter: true });
        console.log('Database synced');
        // Start the server
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error('Unable to sync database:', error);
    }
});
// startServer();
