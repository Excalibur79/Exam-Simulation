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

export const getuser = catchAsync(async (req: CustomRequest, res: Response) => {
  const db = getDb();
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
  const { name, email, password, institution, phoneNumber, age } = req.body;
  if (!name || !email || !password || !institution || !phoneNumber)
    throw new CustomError('Some Fields are missing !', 500);
  let findByEmail = 'select * from `User` where `email`=?';
  let [rows, fields] = await db.execute(findByEmail, [email]);
  if (rows.length > 0)
    throw new CustomError('User with this email id already exists !', 500);
  let registerUser =
    'insert into `User` (`id`,`name`,`email`,`image`,`password`,`institution`,`phoneNumber`,`age`) values(?,?,?,?,?,?,?,?)';
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);
  let id = uuid();
  const result = await db.execute(registerUser, [
    id,
    name,
    email,
    '',
    passwordHash,
    institution,
    phoneNumber,
    age,
  ]);
  if (result)
    res
      .status(200)
      .json(
        SuccessResponse(
          { id, name, email, image: '', institution, phoneNumber, age },
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

export const registerInExam = catchAsync(
  async (req: CustomRequest, res: Response) => {
    const db = getDb();
    let query;
    const { examId, userId, email } = req.body;
    //check if the ids are valid then insert in exam-participants table
    query = 'select isPrivate from `Exam` where `id`=?';
    let [rows] = await db.execute(query, [examId]);
    if (rows.length != 1) throw new CustomError('Exam not found !', 500);
    let { isPrivate } = rows[0];
    if (isPrivate) {
      query = 'select `email` from `Private-Exam-Emails` where `email`=?';
      let [rows] = await db.execute(query, [email]);
      if (rows.length != 1)
        throw new CustomError('Not allowed to enter !', 404);
    }
    query =
      'insert into `Exam-Participants` (`examId`,`participantId`) values(?,?)';
    let result = await db.execute(query, [examId, userId]);
    if (!result) throw new CustomError('Registering failed !', 500);
    res.status(200).send('Successfully Registered !');
  }
);

export const getExam = catchAsync(async (req: CustomRequest, res: Response) => {
  const db = getDb();
  const { examId, email } = req.body;
  let query = 'select count(*) as data from `Exam` where `id`=? limit 1';
  const [result] = await db.execute(query, [examId]);
  let ifExist = result[0].data;
  console.log(ifExist);
  // if (rows.length != 1) throw new CustomError('Exam Not Found !', 500);
  // if (!rows[0].ongoing)
  //   throw new CustomError('Exam has not started yet !', 500);
  // query = 'select participantid'
  // if (rows[0].isPrivate) {
  //   query =
  //     'select * from `Private-Exam-Emails` where `examId`=? and `email`=?';
  //   let [rows] = await db.execute(query, [examId, email]);
  //   if (rows.length != 1) throw new CustomError('Not allowed !', 401);
  // }
  // return res.status(200).json(SuccessResponse(rows[0], 'Exam started !'));
});
