import express from 'express';
import { depositUserMoney, getDepositAmount, getUserMoney } from '../controllers/money.js';

const router = express.Router();

router.get('/:id', getUserMoney);
router.post('/:id', depositUserMoney);
router.get('/amount/:deposit_id', getDepositAmount);


export default router;