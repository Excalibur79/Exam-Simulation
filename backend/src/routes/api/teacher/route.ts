import express from 'express';
import * as teacherController from '../../../controllers/teacherController';

const router = express.Router();

router.get('/createTeacher', teacherController.createTeacher);

export default router;
