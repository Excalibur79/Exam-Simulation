import catchAsync from '../utils/catchAsync';
import { Response, Request, NextFunction } from 'express';
import db from '../database/dbConnection';

export const createExamTable = catchAsync(
  async (req: Request, res: Response) => {
    let query =
      'create table `Exam` ( id varchar(50) , subject varchar(50) , questions json , startTime datetime , duration integer , constraint exam_pk primary key(id) )';
    db.query(query, (err, result) => {
      if (err) res.status(500).send('Table not created !');
      else {
        res.status(200).send('Table created !');
        console.log(result);
      }
    });
  }
);
