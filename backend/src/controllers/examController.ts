import catchAsync from '../utils/catchAsync';
import { Response, Request, NextFunction } from 'express';
import db from '../database/dbConnection';
import scheduler from 'node-cron';
import { v4 as uuid } from 'uuid';

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

export const createExam = catchAsync(async (req: Request, res: Response) => {
  //data =>{examData :{ subject,questions,startTime,duration },teacherId:String}
  let query =
    'insert into `Exam` (`id`,`subject`,`questions`,`startTime`,`duration`) values(?,?,?,?,?)';
  let data = req.body.examData || {};
  data['id'] = uuid();
  db.query(
    query,
    [
      data.id,
      data.subject,
      JSON.stringify(data.questions),
      new Date(),
      data.duration,
    ],
    (err, result) => {
      if (err) {
        res.status(500).send('Exam not created !');
        console.log(err);
      } else {
        res.status(200).send('Exam Created !');
        console.log(result);
        //configure schedulers
      }
    }
  );
  console.log([
    data.id,
    data.subject,
    data.questions,
    data.startTime,
    data.duration,
  ]);
});

const evaluateExam = (examId: String) => {
  //evaluate Exam and update database
};
