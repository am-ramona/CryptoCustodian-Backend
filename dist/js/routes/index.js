"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const walletTransactions_1 = require("../controllers/walletTransactions");
const router = (0, express_1.Router)();
router.get("/getWalletTransactions", walletTransactions_1.getWalletTransactions);
exports.default = router;
