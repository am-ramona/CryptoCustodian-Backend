import { Router } from "express"
import { getWalletTransactions } from "../controllers/walletTransactions"

const router: Router = Router()

router.get("/getWalletTransactions", getWalletTransactions)

export default router
