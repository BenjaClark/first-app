import config from "./config";
import pg from "pg";

const { Pool } = pg;

const { dbUser, dbHost, dbName, dbPassword, dbPort } = config;

const pool = new Pool({
  user: dbUser,
  host: dbHost,
  database: dbName,
  password: dbPassword,
  port: parseInt(dbPort),
  keepAlive: true,
});

pool.connect(function (err) {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log("conectado correctamente");
  }
});

export default pool;