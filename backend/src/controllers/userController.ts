import catchAsync from '../utils/catchAsync';
import { SuccessResponse } from '../utils/response-handler';
import { CustomRequest } from '../utils/CustomInterfaces/CustomRequest';
import CustomError from '../errors/custom-error';
import { Response, Request, NextFunction } from 'express';
import db, { getDb } from '../database/dbConnection';
import scheduler from 'node-cron';
import { v4 as uuid } from 'uuid';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const createUserTable = catchAsync(
  async (req: Request, res: Response) => {
    const db = getDb();
    let query =
      'create table User ( id varchar(50) not null, name varchar(50) , email varchar(50) ,image longtext, password longtext ,institution longtext ,phoneNumber varchar(50) ,constraint user_pk primary key(id) )';
    const result = await db.execute(query);
    if (result) res.status(200).send('User Table Created !');
    else throw new CustomError('User Table Not   created  !', 500);
  }
);

export const getuser = catchAsync(async (req: CustomRequest, res: Response) => {
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

//Register =====================================
export const registerUser = catchAsync(async (req: Request, res: Response) => {
  const db = getDb();
  const { name, email, password, institution, phoneNumber } = req.body;
  if (!name || !email || !password || !institution || !phoneNumber)
    throw new CustomError('Some Fields are missing !', 500);
  let findByEmail = 'select * from `User` where `email`=?';
  let [rows, fields] = await db.execute(findByEmail, [email]);
  if (rows.length > 0)
    throw new CustomError('User with this email id already exists !', 500);
  let registerUser =
    'insert into `User` (`id`,`name`,`email`,`image`,`password`,`institution`,`phoneNumber`) values(?,?,?,?,?,?,?)';
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);
  const result = await db.execute(registerUser, [
    uuid(),
    name,
    email,
    '',
    passwordHash,
    institution,
    phoneNumber,
  ]);
  if (result)
    res
      .status(200)
      .json(
        SuccessResponse(
          { name, email, institution, phoneNumber },
          'User Inserted !'
        )
      );
  else throw new CustomError('User not inserted!', 500);
});
//==============================================

//login ========================================
export const loginUser = catchAsync(async (req: Request, res: Response) => {
  const db = getDb();
  const { email, password } = req.body;
  if (!email || !password)
    throw new CustomError('Some Fields are missing !', 500);
  let findByEmail = 'select * from `User` where `email`=?';
  let [rows, fields] = await db.execute(findByEmail, [email]);
  if (rows.length != 1) throw new CustomError('No User with this Email!', 500);
  const user = rows[0];
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new CustomError("Password does'nt match !", 404);
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET!);
  res
    .status(200)
    .json(
      SuccessResponse({ token: 'Bearer ' + token, user }, 'User Logged in!')
    );
});
//==============================================

//logout ========================================
export const logoutUser = catchAsync(
  async (req: CustomRequest, res: Response) => {
    res.status(200).send('Logout Successfull !');
  }
);
//================================================

//edit==========================================
export const editUser = catchAsync(
  async (req: CustomRequest, res: Response) => {}
);
//==============================================
