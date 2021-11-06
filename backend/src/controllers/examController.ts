import catchAsync from '../utils/catchAsync';
import { Response, Request, NextFunction } from 'express';
import CustomError from '../errors/custom-error';
import { SuccessResponse } from '../utils/response-handler';
import { getDb } from '../database/dbConnection';
import scheduler from 'node-cron';
import { v4 as uuid } from 'uuid';

export const createExamTable = catchAsync(
  async (req: Request, res: Response) => {
    const db = getDb();
    let query =
      'create table `Exam` ( id varchar(50) , subject varchar(50) , questions json , startTime datetime , duration integer , constraint exam_pk primary key(id) )';
    const result = await db.execute(query);
    if (result) res.status(200).send('Exam Table Created !');
    else throw new CustomError('Exam Table not Created !', 500);
  }
);

export const createExam = catchAsync(async (req: Request, res: Response) => {
  //data =>{examData :{ subject,questions,startTime,duration },teacherId:String}
  const db = getDb();
  let query =
    'insert into `Exam` (`id`,`subject`,`questions`,`startTime`,`duration`) values(?,?,?,?,?)';
  let data = req.body.examData || {};
  data['id'] = uuid();
  const result = await db.execute(query, [
    data.id,
    data.subject,
    JSON.stringify(data.questions),
    new Date(),
    data.duration,
  ]);
  if (result) res.status(200).send('Exam Created');
  else throw new CustomError('Exam not Created !', 500);
});

const evaluateExam = (examId: String) => {
  //evaluate Exam and update database
};
