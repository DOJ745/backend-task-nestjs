import { DataSource } from "typeorm";
import { User } from "./models/user.model";

export const PostgresDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "test",
    password: "test",
    database: "test",
    entities: [User],
    logging: true,
    synchronize: true
});

PostgresDataSource.initialize()
    .then(() => { console.log("Data Source has been initialized!") })
    .catch((err) => { console.error("Error during Data Source initialization", err) })