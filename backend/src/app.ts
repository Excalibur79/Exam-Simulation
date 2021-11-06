import express from 'express';

import teacherRoutes from './routes/api/teacher/route';
import studentRoutes from './routes/api/student/route';
import examRoutes from './routes/api/exam/route';

import { connectDatabase } from './database/dbConnection';

const app = express();

app.use(express.json());

app.use('/teacher', teacherRoutes);
app.use('/student', studentRoutes);
app.use('/exam', examRoutes);

//connecting database
connectDatabase();
//===================

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
