import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateUserUseCase } from "./CreateUserUseCase";

let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;

describe("Create a User", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    });

    it("Should be able to create a user", async () => {
        const user = {
            name: "Eric Maxwell",
            password: "782511",
            email: "vun@sekmeja.no",
            driver_license: "090123",
        };

        await createUserUseCase.execute(user);

        const result = await usersRepositoryInMemory.findByEmail(user.email);

        expect(result).toHaveProperty("id");
        expect(result.email).toEqual(user.email);
        expect(result.name).toEqual(user.name);
    });

    it("Should not be able to create a user, if user already exists", async () => {
        const user = {
            name: "Eric Townsend",
            password: "782511",
            email: "tec@fuiri.to",
            driver_license: "090123",
        };

        await createUserUseCase.execute(user);

        await expect(createUserUseCase.execute(user)).rejects.toEqual(
            new AppError("User Already Exists!")
        );
    });
});
