import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (): Promise<Connection> => {
    const defaultOptions = await getConnectionOptions();

    return createConnection(
        Object.assign(defaultOptions, {
            host: "localhost",
            database:
                process.env.NODE_ENV === "test"
                    ? "rentx_test"
                    : defaultOptions.database,
        })
    );
};
