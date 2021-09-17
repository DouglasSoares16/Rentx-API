import { Connection, createConnection } from "typeorm";

createConnection();

export default async (): Promise<Connection> => {
    return createConnection();
};
