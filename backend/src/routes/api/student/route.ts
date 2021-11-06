import express from 'express';

import * as studentController from '../../../controllers/studentController';

const router = express.Router();

router.get('/createStudentTable', studentController.createStudentTable);

export default router;
