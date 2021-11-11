import catchAsync from '../utils/catchAsync';
import { SuccessResponse } from '../utils/response-handler';
import CustomError from '../errors/custom-error';
import { Response, Request, NextFunction } from 'express';
import { getDb } from '../database/dbConnection';
import scheduler from 'node-schedule';
import { v4 as uuid } from 'uuid';
import { CustomRequest } from '../utils/CustomInterfaces/CustomRequest';
import { scheduleExam, destroyScheduler } from '../utils/examFunctions';

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
  let date = new Date();
  date.setSeconds(date.getSeconds() + 30);
  const result = await db.execute(query, [
    data.id,
    data.subject,
    data.userId,
    JSON.stringify(data.questions),
    date,
    data.duration,
  ]);
  if (result) {
    res.status(200).send('Exam  Created');
    scheduleExam(data.id, date, data.duration);
  } else throw new CustomError('Exam  not created !', 500);
});

export const editExam = catchAsync(
  async (req: CustomRequest, res: Response) => {
    // if(!req.user) throw new CustomError("User Error",404);
    const { subject, questions, startTime, duration, id, userId } = req.body;
    const db = getDb();
    let getExamByUserId = 'select * from `Exam` where `userId`=? and `id`=?';
    let [rows, fields] = await db.execute(getExamByUserId, [
      req.body.userId,
      req.body.id,
    ]); //authorization to be added ! to e compared with req.user.id and req.body.userId
    if (rows.length != 1) throw new CustomError('Exam not found !', 500);
    //console.log(rows[0]);
    let date = new Date();
    date.setSeconds(date.getSeconds() + 60);
    let updateExam =
      'update `Exam` set `subject`=? , `questions`=? , `startTime`=? , `duration`=? where `id`=?';
    let result = await db.execute(updateExam, [
      subject,
      JSON.stringify(questions),
      date,
      duration,
      id,
    ]);
    if (result) {
      console.log(result);
      res.status(200).send('Exam updated !');
      destroyScheduler(id + 'start');
      destroyScheduler(id + 'end');
      scheduleExam(id, date, duration);
    } else throw new CustomError('Exam Not updated !', 500);
  }
);
