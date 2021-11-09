import catchAsync from '../utils/catchAsync';
import { SuccessResponse } from '../utils/response-handler';
import CustomError from '../errors/custom-error';
import { Response, Request, NextFunction } from 'express';
import { getDb } from '../database/dbConnection';
import scheduler from 'node-cron';
import { v4 as uuid } from 'uuid';

export const createExamTable = catchAsync(
  async (req: Request, res: Response) => {
    const db = getDb();
    let query =
      'create table `Exam` ( id varchar(50) , subject varchar(50) ,userId varchar(50), questions json , startTime datetime , duration integer ,ongoing boolean default False, constraint exam_pk primary key(id) )';
    const result = await db.execute(query);
    if (result) res.status(200).send('Exam Table Created !');
    else throw new CustomError('Exam Table not created !', 500);
  }
);

export const createExamParticipantsTable = catchAsync(
  async (req: Request, res: Response) => {
    const db = getDb();
    let query =
      'create table `Exam-Participants` (id integer auto_increment ,examId longtext , participantId longtext ,answers json ,totalScore integer , constraint pk primary key(id) )';
    const result = await db.execute(query);
    if (result) res.status(200).send('Exam-Participants table created !');
    else throw new CustomError('Exam-Participants table not created!', 500);
  }
);

export const createExam = catchAsync(async (req: Request, res: Response) => {
  //data =>{ subject,userId,questions,startTime,duration }
  const db = getDb();
  let query =
    'insert into `Exam` (`id`,`subject`,`userId`,`questions`,`startTime`,`duration`) values(?,?,?,?,?,?)';
  let data = req.body || {};
  data['id'] = uuid();
  const result = await db.execute(query, [
    data.id,
    data.subject,
    data.userId,
    JSON.stringify(data.questions),
    new Date(),
    data.duration,
  ]);
  if (result) {
    res.status(200).send('Exam Created');
    scheduler.schedule('* * * * * *', () => {
      // scheduules start exam
    });
    scheduler.schedule('* * * * * *', () => {
      // scheduules end exam update ongoing in exam and start Evaluation
    });
  } else throw new CustomError('Exam  not created !', 500);
});

const evaluateExam = (examId: String) => {
  //evaluate Exam and update database
};
