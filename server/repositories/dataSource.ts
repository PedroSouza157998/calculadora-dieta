import { DataSource } from "typeorm";
import { Portion } from "../entities/portion";

export const sqlDataSource = new DataSource({
    type: "postgres",
    host: "127.0.0.1",
    port: 5432,
    username: "postgres",
    password: "admin",
    database: "local",
    entities: [Portion],
})