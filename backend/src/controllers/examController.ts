import catchAsync from '../utils/catchAsync';
import { SuccessResponse } from '../utils/response-handler';
import CustomError from '../errors/custom-error';
import { Response, Request, NextFunction } from 'express';
import { getDb } from '../database/dbConnection';
import scheduler from 'node-schedule';
import { v4 as uuid } from 'uuid';
import { CustomRequest } from '../utils/CustomInterfaces/CustomRequest';
import { scheduleExam, destroyScheduler } from '../utils/examFunctions';

export const createTables = catchAsync(async (req: Request, res: Response) => {
  const db = getDb();
  let query, result;

  //User table===================
  query =
    'create table User ( id varchar(50) not null, name varchar(50) , email varchar(50) ,image longtext, password longtext ,institution longtext ,phoneNumber varchar(50) ,constraint user_pk primary key(id) )';
  result = await db.execute(query);
  if (!result) throw new CustomError('User Table Not   created  !', 500);
  //=============================

  //Exam table==================
  query =
    'create table `Exam` ( id varchar(50) , subject varchar(50) ,userId varchar(50), questions json , startTime datetime , duration integer ,ongoing boolean default False, isPrivate boolean default False , constraint exam_pk primary key(id) ,constraint fk1 foreign key (userId) references User(id) )';
  result = await db.execute(query);
  if (!result) throw new CustomError('Exam Table not created !', 500);
  //============================

  //Exam-Participants table========
  query =
    'create table `Exam-Participants` (id integer auto_increment ,examId longtext , participantId longtext ,answers json ,totalScore integer , constraint pk primary key(id) )';
  result = await db.execute(query);
  if (!result)
    throw new CustomError('Exam-Participants table not created!', 500);
  //================================

  //private exam emails table====
  query =
    'create table `Private-Exam-Emails` (id integer auto_increment,examId varchar(50) , email varchar(50) , constraint pk primary key(id) , constraint fkx foreign key (examId) references Exam(id))';
  result = await db.execute(query);
  if (!result)
    throw new CustomError('Private-Exam Emails table not created !', 500);
  //=============================
  res.status(200).send('All tables created !');
});

export const createExam = catchAsync(async (req: Request, res: Response) => {
  //data =>{ subject,userId,questions,startTime,duration ,isPrivate ,allowedusers}
  const db = getDb();
  let query =
    'insert into `Exam` (`id`,`subject`,`userId`,`questions`,`startTime`,`duration`,`isPrivate`) values(?,?,?,?,?,?,?)';
  let data = req.body || {};
  data['id'] = uuid();
  let date = new Date();
  date.setSeconds(date.getSeconds() + 30);
  const result1 = await db.execute(query, [
    data.id,
    data.subject,
    data.userId,
    JSON.stringify(data.questions),
    date,
    data.duration,
    data.isPrivate,
  ]);
  if (!result1) throw new CustomError('Exam not created !', 500);
  if (data.isPrivate) {
    query = 'insert into `Private-Exam-Emails` (`examId`,`email`) values ';
    let queryArray: any = [];
    data.allowedUsers.map((allowedUserEmail: String) => {
      queryArray.push(`('` + data.id + `','` + allowedUserEmail + `')`);
    });
    queryArray = queryArray.join(',');
    let result2 = await db.execute(query + queryArray);
    if (!result2)
      throw new CustomError(
        'Failed to set Private User in Private-Exam-Email table',
        500
      );
  }
  res.status(200).send('Exam  Created');
  scheduleExam(data.id, date, data.duration);
});

export const editExam = catchAsync(
  async (req: CustomRequest, res: Response) => {
    // if(!req.user) throw new CustomError("User Error",404);
    const {
      subject,
      questions,
      startTime,
      duration,
      id,
      userId,
      isPrivate,
      allowedUsers,
    } = req.body;
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
      'update `Exam` set `subject`=? , `questions`=? , `startTime`=? , `duration`=? , `isPrivate`=? where `id`=?';
    let result1 = await db.execute(updateExam, [
      subject,
      JSON.stringify(questions),
      date,
      duration,
      isPrivate,
      id,
    ]);
    if (!result1) throw new CustomError('Exam not updated !', 500);

    let deleteByEmail = 'delete from `Private-Exam-Emails` where `examId`=?';
    const result2 = await db.execute(deleteByEmail, [id]);
    if (!result2)
      throw new CustomError('Delete from Private-Exam-Emails failed !', 500);

    if (isPrivate) {
      let query =
        'insert into `Private-Exam-Emails` (`examId`,`email`) values ';
      let queryArray: any = [];
      allowedUsers.map((allowedUserEmail: String) => {
        queryArray.push(`('` + id + `','` + allowedUserEmail + `')`);
      });
      queryArray = queryArray.join(',');
      let result3 = await db.execute(query + queryArray);
      if (!result3)
        throw new CustomError(
          'Failed to update Private User in Private-Exam-Email table',
          500
        );
    }
    res.status(200).send('Exam updated !');
    destroyScheduler(id + 'start');
    destroyScheduler(id + 'end');
    scheduleExam(id, date, duration);
  }
);
