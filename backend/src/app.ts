import express from 'express';

import teacherRoutes from './routes/api/teacher/route';
import studentRoutes from './routes/api/student/route';
import examRoutes from './routes/api/exam/route';
import userRoutes from './routes/api/user/routes';

import { connectDatabase } from './database/dbConnection';

const app = express();

app.use(express.json());

app.use('/teacher', teacherRoutes);
app.use('/student', studentRoutes);
app.use('/exam', examRoutes);
app.use('/user', userRoutes);

//connecting database
connectDatabase();
//===================

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
