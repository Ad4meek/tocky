import express from 'express';
import { createUser, getUserMoney, loginUser, logoutUser } from '../controllers/users.js';

const router = express.Router();


router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.get('/money/:id', getUserMoney);



export default router;