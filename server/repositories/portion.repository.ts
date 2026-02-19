import { DataSource, Repository } from "typeorm";
import { Portion } from "../entities/portion";
import { sqlDataSource } from "./dataSource";

export class PortionRepository {
    build() {
        return sqlDataSource.getRepository(Portion);
    }
}
