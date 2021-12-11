import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    token: string;
    password: string;
}

@injectable()
class ResetPasswordUserUseCase {
    constructor(
        @inject("UsersTokensRepository")
        private userTokensRepository: IUsersTokensRepository,

        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,

        @inject("UsersRepository")
        private userRepository: IUsersRepository
    ) {}

    async execute({ password, token }: IRequest): Promise<void> {
        const userToken = await this.userTokensRepository.findByRefreshToken(
            token
        );

        if (!userToken) {
            throw new AppError("Token invalid!");
        }

        if (
            this.dateProvider.compareIfBefore(
                userToken.expires_date,
                this.dateProvider.dateNow()
            )
        ) {
            throw new AppError("Token expired!");
        }

        const user = await this.userRepository.findById(userToken.user_id);

        user.password = await hash(password, 8);

        await this.userRepository.create(user);

        await this.userTokensRepository.deleteById(userToken.id);
    }
}

export { ResetPasswordUserUseCase };
