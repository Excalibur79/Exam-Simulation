import e from 'express';
import mysql from 'mysql2/promise';

let db: any;
const connectDatabase = async () => {
  db = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ankur12345',
    database: 'examsimulation',
  });
  if (db) console.log('Database Connected !');
  else console.log('Database Not Connected !');
};

const getDb = () => {
  return db;
};

export default db;
export { connectDatabase, getDb };
