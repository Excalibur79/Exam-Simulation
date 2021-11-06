import catchAsync from '../utils/catchAsync';
import { Response, Request, NextFunction } from 'express';
import db from '../database/dbConnection';

export const createStudentTable = catchAsync(
  async (req: Request, res: Response) => {
    let query =
      'create table Student( id varchar(50) , name varchar(50) , email varchar(50) , institution varchar(50) , phoneNumber varchar(50) ,constraint student_pk primary key(id))';
    db.query(query, (err, result) => {
      if (err) res.status(500).send('Table not created !');
      else {
        res.status(200).send('Student Table created !');
        console.log(result);
      }
    });
  }
);
