import catchAsync from '../utils/catchAsync';
import { Request, Response, NextFunction } from 'express';
import db from '../database/dbConnection';
import { v4 as uuid } from 'uuid';

import scheduler from 'node-cron';

export const createTeacherTable = catchAsync(
  async (req: Request, res: Response) => {
    let query =
      'create table Teacher( id varchar(50) not null, name varchar(50) , email varchar(50) , institution varchar(50) , constraint teacher_pk primary key(id) )';
    db.query(query, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('Table not created !');
      } else {
        console.log(result);
        return res.status(200).send('Teacher table created !');
      }
    });
  }
);

export const createTeacher = catchAsync(async (req: Request, res: Response) => {
  let id: String = uuid();
  let name: String = req.body.name || '';
  let email: String = req.body.email || '';
  let institution: String = req.body.institution || '';
  let data = { id, name, email, institution };
  let query = 'insert into `Teacher` set ?';
  db.query(query, data, (err, result) => {
    if (err) res.status(500).send('Insertion Failed !');
    else res.status(200).send('Teacher inserted !');
    console.log(result);
  });
});

export const getTeacher = catchAsync(async (req: Request, res: Response) => {
  scheduler.schedule('* * * * * *', () => {
    // console.log('Scheduler running !');
  });
  let id: String = req.body.id || '';
  let query = 'select * from `Teacher` where `id` = ?';
  db.query(query, [id], (err, result: any) => {
    if (err || result.length == 0) res.status(500).send('Teacher not found !');
    else res.status(200).json(result[0]);
  });
});
