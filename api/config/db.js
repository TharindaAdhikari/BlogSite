import mysql from "mysql"
// import the "dotenv" package
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// call the config function
const file = process.env.NODE_ENV;
console.log("file:=>", file)
dotenv.config({
  path: path.resolve(__dirname, `../development.env`),
  //path: path.resolve(new URL(`../development.env`, import.meta.url).pathname),
});

console.log(process.env.DB_KEY);
 export const db = mysql.createConnection({
  host:process.env.DATABASE_HOST,
  user:process.env.DATABASE_USERNAME,
  password: process.env.DB_KEY,
  database:process.env.DATABASE_NAME
})

// db.connect((err) => {
//   if (err) console.log(err);
//   console.log('MySql Connected');
// });

// module.exports = db;