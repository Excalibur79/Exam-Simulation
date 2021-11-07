import catchAsync from '../utils/catchAsync';
import { SuccessResponse } from '../utils/response-handler';
import CustomError from '../errors/custom-error';
import { Response, Request, NextFunction } from 'express';
import { getDb } from '../database/dbConnection';
import scheduler from 'node-cron';
import { v4 as uuid } from 'uuid';
import { json } from 'stream/consumers';

export const createUserTable = catchAsync(
  async (req: Request, res: Response) => {
    const db = getDb();
    let query =
      'create table User ( id varchar(50) not null, name varchar(50) , email varchar(50) , password longtext ,institution longtext ,phoneNumber varchar(50) ,constraint user_pk primary key(id) )';
    const result = await db.execute(query);
    if (result) res.status(200).send('User Table Created !');
    else throw new CustomError('User Table Not created !', 500);
  }
);

export const createUser = catchAsync(async (req: Request, res: Response) => {
  const db = getDb();
  let id: String = uuid();
  let name: String = req.body.name || '';
  let email: String = req.body.email || '';
  let password: String = req.body.pasword || '';
  let institution: String = req.body.institution || '';
  let phoneNumber: String = req.body.phoneNumber || '';
  let data = { id, name, email, password, institution, phoneNumber };
  let query = 'insert into `User` set ?';
  const [rows, fields] = await db.execute(query, data);
  if (rows && rows.length > 0) res.status(200).send('User Inserted !');
  else throw new CustomError('User not inserted  !', 500);
});

export const getuser = catchAsync(async (req: Request, res: Response) => {
  const db = getDb();
  scheduler.schedule('* * * * * *', () => {
    // console.log('Scheduler running !');
  });
  let id: String = req.body.id || '';
  let query = 'select * from `User` where `id` = ?';
  const [rows, fields] = await db.execute(query, [id]);
  if (rows && rows.length > 0) {
    res.status(200).json(SuccessResponse(rows[0], 'User Found !'));
    console.log(rows);
  } else res.status(500).send('User Not Found !');
});
