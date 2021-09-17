import { hash } from "bcryptjs";
import { v4 as uuid } from "uuid";

import createConnection from "../connection";

async function create() {
    const connection = await createConnection();

    const id = uuid();
    const password = await hash("admin", 8);

    await connection.query(`
        INSERT INTO users(id, name, email, password, "isAdmin", created_at, driver_license)
        VALUES('${id}', 'admin', 'admin@rentalx.com.br', '${password}', true, 'now()', 'XXXX')
    `);

    await connection.close();
}

create().then(() => console.log("User Admin Created!"));
