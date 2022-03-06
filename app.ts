import dotenv from "dotenv";
import Server from "./server/server";
import DnaController from "./controllers/DnaController";
import ReportController from "./controllers/ReportController";
import ReportRepositoryDb from "./repositories/ReportRepositoryDb";
import { Pool } from "pg";
dotenv.config();

//dbClient
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  password: process.env.PGPASSWORD,
  port: Number(process.env.PGPORT) || 5432,
  database: process.env.PGDATABASE,
  // ssl: { rejectUnauthorized: false },
});

//repositories
const reportRepository = new ReportRepositoryDb(pool);
//controllers
const dnaController = new DnaController();
const reportController = new ReportController(reportRepository);

const server = new Server(dnaController, reportController);
server.listen();
