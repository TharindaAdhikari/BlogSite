import mysql from "mysql"
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// call the config function
const file = process.env.NODE_ENV;
dotenv.config({
  path: path.resolve(__dirname, `../development.env`),
});

 export const db = mysql.createConnection({
  host:process.env.DATABASE_HOST,
  user:process.env.DATABASE_USERNAME,
  password: process.env.DB_KEY,
  database:process.env.DATABASE_NAME
});

