import cnf from "dotenv";
cnf.config();

const config = {
  apiPort: process.env.API_PORT || "",
  apiEmailUrl: process.env.API_EMAIL_URL || "",
  dbUser: process.env.DB_USER || "",
  dbHost: process.env.DB_HOST || "",
  dbName: process.env.DB_NAME || "",
  dbPassword: process.env.DB_PASSWORD || "",
  dbPort: process.env.DB_PORT || "",
};
export default config;