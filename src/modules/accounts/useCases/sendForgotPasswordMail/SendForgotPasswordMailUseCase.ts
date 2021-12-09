import { inject, injectable } from "tsyringe";
import { v4 as uuid } from "uuid";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";
import { AppError } from "@shared/errors/AppError";

@injectable()
class SendForgotPasswordMailUseCase {
    constructor(
        @inject("UsersRepository")
        private userRepository: IUsersRepository,

        @inject("UsersTokensRepository")
        private userTokensRepository: IUsersTokensRepository,

        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,

        @inject("EtherealMailProvider")
        private mailProvider: IMailProvider
    ) {}

    async execute(email: string): Promise<void> {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new AppError("User does not exists!");
        }

        const token = uuid();

        const expires_date = this.dateProvider.addHours(3);

        await this.userTokensRepository.create({
            refresh_token: token,
            user_id: user.id,
            expires_date,
        });

        await this.mailProvider.sendMail(
            email,
            "Recuperação de senha",
            `O link para o reset é ${token}`
        );
    }
}

export { SendForgotPasswordMailUseCase };
