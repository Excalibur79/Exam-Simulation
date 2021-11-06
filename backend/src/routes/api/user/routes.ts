import express from 'express';
import * as userController from '../../../controllers/userController';

const router = express.Router();
router.get('/createUserTable', userController.createUserTable);
router.post('/createUser', userController.createUser);
router.get('/getUser', userController.getUser);

export default router;
