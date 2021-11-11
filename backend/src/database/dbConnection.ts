import e from 'express';
import mysql from 'mysql2/promise';
import { scheduleOnServerRestart } from '../utils/examFunctions';

let db: any;
const connectDatabase = async () => {
  db = await mysql.createConnection({
    host: 'mydbinstance.cyfjjout6pho.ap-south-1.rds.amazonaws.com',
    user: 'subho57',
    password: 'adminDBpassword123',
    database: 'examSimulation',
  });
  if (db) {
    console.log('Database Connected !');
    scheduleOnServerRestart();
  } else console.log('Database Not Connected !');
};

const getDb = () => {
  return db;
};

export default db;
export { connectDatabase, getDb };
