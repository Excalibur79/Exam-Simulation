import catchAsync from '../utils/catchAsync';
import { Response, Request, NextFunction } from 'express';
import { getDb } from '../database/dbConnection';

export const createStudentTable = catchAsync(
  async (req: Request, res: Response) => {
    const db = getDb();
    let query =
      'create table Student( id varchar(50) , name varchar(50) , email varchar(50) , institution varchar(50) , phoneNumber varchar(50) ,constraint student_pk primary key(id))';
    const result = await db.execute(query);
    if (result > 0) res.status(200).send('Student Table Created !');
    else res.status(500).send('Student Table not created !');
  }
);
