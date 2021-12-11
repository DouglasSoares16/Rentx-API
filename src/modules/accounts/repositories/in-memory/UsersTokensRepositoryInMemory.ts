import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";

import { IUsersTokensRepository } from "../IUsersTokensRepository";

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
    repository: UserTokens[] = [];

    async create({
        expires_date,
        user_id,
        refresh_token,
    }: ICreateUserTokenDTO): Promise<UserTokens> {
        const userToken = new UserTokens();

        Object.assign(userToken, {
            expires_date,
            user_id,
            refresh_token,
        });

        this.repository.push(userToken);

        return userToken;
    }

    async findByUserIdAndRefreshToken(
        user_id: string,
        refresh_token: string
    ): Promise<UserTokens> {
        const userToken = this.repository.find(
            (userToken) =>
                userToken.user_id === user_id &&
                userToken.refresh_token === refresh_token
        );

        return userToken;
    }

    async deleteById(id: string): Promise<void> {
        const userToken = this.repository.find(
            (userToken) => userToken.id === id
        );

        const index = this.repository.indexOf(userToken);

        this.repository.splice(index);
    }

    async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
        const userToken = this.repository.find(
            (userToken) => userToken.refresh_token === refresh_token
        );

        return userToken;
    }
}

export { UsersTokensRepositoryInMemory };
