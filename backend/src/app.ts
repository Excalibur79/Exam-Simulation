import express from 'express';

import examRoutes from './routes/api/exam/routes';
import userRoutes from './routes/api/user/routes';

import { connectDatabase } from './database/dbConnection';

const app = express();

app.use(express.json());

app.use('/exam', examRoutes);
app.use('/user', userRoutes);

//connecting database
connectDatabase();
//===================

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
