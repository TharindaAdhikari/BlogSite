import Sequelize from "sequelize";
import dotenv from "dotenv";
import path from "path";
import colors from 'colors';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({
  path: path.resolve(__dirname, `../development.env`),
  //path: path.resolve(new URL(`../development.env`, import.meta.url).pathname),
});

console.log(`NODE_ENV=${process.env.NODE_ENV}`);

//const envPath = path.resolve(new URL(`../${process.env.NODE_ENV.trim()}.env`, import.meta.url).pathname);

const db = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST || "localhost",
    dialect: "mysql",
  }
);

db.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });

console.log(`NODE_ENV=${process.env.NODE_ENV}`.yellow);

export default db;