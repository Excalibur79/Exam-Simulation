import express from 'express';
import * as teacherController from '../../../controllers/teacherController';

const router = express.Router();

router.post('/createTeacher', teacherController.createTeacher);
router.get('/createTeacherTable', teacherController.createTeacherTable);
router.post('/getTeacher', teacherController.getTeacher);

export default router;
