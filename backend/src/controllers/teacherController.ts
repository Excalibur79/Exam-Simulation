import catchAsync from '../utils/catchAsync';
import { Request, Response, NextFunction } from 'express';

export const createTeacher = catchAsync(async (req: Request, res: Response) => {
  res.status(200).send('Teacher Created!');
});
