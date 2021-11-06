import catchAsync from '../utils/catchAsync';
import e, { Request, Response, NextFunction } from 'express';
import { getDb } from '../database/dbConnection';
import { v4 as uuid } from 'uuid';

import scheduler from 'node-cron';

export const createTeacherTable = catchAsync(
  async (req: Request, res: Response) => {
    const db = getDb();
    let query =
      'create table Teacher( id varchar(50) not null, name varchar(50) , email varchar(50) , institution varchar(50) , constraint teacher_pk primary key(id) )';
    const [rows, fields] = await db.execute(query);
    if (rows && rows.length > 0)
      res.status(200).send('Teacher Table Created !');
    else res.status(500).send('Teacher Table not created !');
  }
);

export const createTeacher = catchAsync(async (req: Request, res: Response) => {
  const db = getDb();
  let id: String = uuid();
  let name: String = req.body.name || '';
  let email: String = req.body.email || '';
  let institution: String = req.body.institution || '';
  let data = { id, name, email, institution };
  let query = 'insert into `Teacher` set ?';
  const [rows, fields] = db.execute(query, data);
  if (rows && rows.length > 0) res.status(200).send('Teacher Inserted !');
  else res.status(500).send('Teacher Not Inserted !');
});

export const getTeacher = catchAsync(async (req: Request, res: Response) => {
  const db = getDb();
  scheduler.schedule('* * * * * *', () => {
    // console.log('Scheduler running !');
  });
  let id: String = req.body.id || '';
  let query = 'select * from `Teacher` where `id` = ?';
  const [rows, fields] = await db.execute(query, [id]);
  if (rows && rows.length > 0) {
    res.status(200).json(rows[0]);
    console.log(rows);
  } else res.status(500).send('Teacher Not Found !');
});
