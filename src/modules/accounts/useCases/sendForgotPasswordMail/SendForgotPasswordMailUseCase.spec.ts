import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let mailProvider: MailProviderInMemory;

describe("Forgot Password Mail", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        mailProvider = new MailProviderInMemory();

        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
            usersRepositoryInMemory,
            usersTokensRepositoryInMemory,
            dateProvider,
            mailProvider
        );
    });

    it("Should be able to send a forgot password mail to user", async () => {
        const sendMail = jest.spyOn(mailProvider, "sendMail");

        await usersRepositoryInMemory.create({
            driver_license: "702039",
            email: "deki@rinte.vc",
            name: "Maude Baker",
            password: "12345",
        });

        await sendForgotPasswordMailUseCase.execute("deki@rinte.vc");

        expect(sendMail).toHaveBeenCalled();
    });

    it("Should not be able to send a forgot password mail to user, if user does not exists", async () => {
        await expect(
            sendForgotPasswordMailUseCase.execute("deki@rinte.vcgin@dew.ne")
        ).rejects.toEqual(new AppError("User does not exists!"));
    });

    it("Should not be able to create an users token", async () => {
        const generateTokenMail = jest.spyOn(
            usersTokensRepositoryInMemory,
            "create"
        );

        await usersRepositoryInMemory.create({
            driver_license: "578291",
            email: "ovaso@humnir.dm",
            name: "Elizabeth Ortiz",
            password: "12345",
        });

        await sendForgotPasswordMailUseCase.execute("ovaso@humnir.dm");

        expect(generateTokenMail).toHaveBeenCalled();
    });
});
