import express from 'express';
import * as examController from '../../../controllers/examController';
import auth from '../../../middlewares/auth';

const router = express.Router();
router.get('/createExamTable', examController.createExamTable);
router.post('/createExam', examController.createExam);
router.get(
  '/createExamParticipantsTable',
  examController.createExamParticipantsTable
);
router.post('/editExam', examController.editExam);

export default router;
