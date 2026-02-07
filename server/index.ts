import 'dotenv/config';
import express from "express";
import router from "./routes";

const app = express();

app.use('/api', router);

export default app;
