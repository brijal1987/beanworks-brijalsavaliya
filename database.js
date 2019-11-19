import mysql from 'mysql';
import dotenv from 'dotenv';
dotenv.config();

var connection = mysql.createConnection({
    host     : process.env.DATABASE_HOST,
    user     : process.env.DATABASE_USERNAME,
    password : process.env.DATABASE_PASSWORD,
    database : process.env.DATABASE_NAME,
    port : process.env.DATABASE_PORT
  });
  connection.connect();

  export default connection;