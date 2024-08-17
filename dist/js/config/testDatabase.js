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
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("./database"));
const walletTransactions_1 = __importDefault(require("../models/walletTransactions"));
function testDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Sync the database
            yield database_1.default.sync({ force: true }); // Use { force: true } to recreate tables for testing
            console.log('Database synchronized');
            // Insert a test record
            yield walletTransactions_1.default.create({
                from: '0xTestAddress',
                to: '0xAnotherAddress',
                value: '1000000000000000000',
                tokenName: 'TestToken',
                tokenSymbol: 'TT',
                tokenDecimal: '18',
                gasUsed: '21000',
                gasPrice: '1000000000',
                timeStamp: '1635600000',
                input: '0x1234',
            });
            // Fetch and log the test record
            const transactions = yield walletTransactions_1.default.findAll();
            console.log('Test data:', transactions);
        }
        catch (error) {
            console.error('Error testing database:', error);
        }
    });
}
testDatabase();
