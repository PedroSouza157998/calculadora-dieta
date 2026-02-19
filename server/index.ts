import 'reflect-metadata';
import 'dotenv/config';

import express from "express";
import router from "./routes";
import { sqlDataSource } from './repositories/dataSource';

console.log("line 1")
const app = express();
const port = 3001;
console.log("line 2")

await sqlDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err);
    });

console.log("line 3")
app.use('/api', router);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
