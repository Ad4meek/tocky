import express from 'express';
import { addAmountMoney, depositUserMoney, getDepositAmount, getUserMoney, removeAmountMoney } from '../controllers/money.js';

const router = express.Router();

router.post('/remove', removeAmountMoney);
router.post('/add', addAmountMoney);
router.get('/:id', getUserMoney);
router.post('/:id', depositUserMoney);
router.get('/amount/:deposit_id', getDepositAmount);


export default router;