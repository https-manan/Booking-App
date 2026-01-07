import express from 'express';
import { login, register } from '../controllers/authController';
const router = express.Router();

router.get("/register",register)
router.get('/login',login)  


export default router;