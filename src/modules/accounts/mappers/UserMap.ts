import { instanceToInstance } from "class-transformer";

import { IUserResponseDTO } from "../dtos/IUserResponseDTO";
import { User } from "../infra/typeorm/entities/User";

class UserMap {
    static toDTO({
        name,
        email,
        avatar,
        id,
        driver_license,
        avatar_url,
    }: User): IUserResponseDTO {
        const user = instanceToInstance({
            name,
            email,
            avatar,
            id,
            driver_license,
            avatar_url,
        });

        return user;
    }
}

export { UserMap };
