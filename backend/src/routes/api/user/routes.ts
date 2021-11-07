import express from 'express';
import * as userController from '../../../controllers/userController';
import auth from '../../../middlewares/auth';

const router = express.Router();
router.get('/createUserTable', userController.createUserTable);
router.post('/getUser', auth, userController.getuser);
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

export default router;
