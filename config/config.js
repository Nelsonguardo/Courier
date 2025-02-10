import dotenv from 'dotenv';
dotenv.config();

const environment = process.env.ENVIROMENT || "development";
let db_name;

switch (environment) {
  case "development":
    db_name = process.env.DB_NAME_DEV;
    break;
  case "test":
    db_name = process.env.DB_NAME_TEST;
    break;
  case "production":
    db_name = process.env.DB_NAME_PROD;
    break;
  default:
    db_name = process.env.DB_NAME_DEV;
}

export const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: db_name,
  port: process.env.DB_PORT,
};

export const port = process.env.PORT || 3000;