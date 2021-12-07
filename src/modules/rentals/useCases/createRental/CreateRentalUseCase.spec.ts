import dayjs from "dayjs";

import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe("Create a new Rental", () => {
    const dayAdd24Hours = dayjs().add(1, "day").toDate();

    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        dayjsDateProvider = new DayjsDateProvider();
        carsRepositoryInMemory = new CarsRepositoryInMemory();

        createRentalUseCase = new CreateRentalUseCase(
            rentalsRepositoryInMemory,
            dayjsDateProvider,
            carsRepositoryInMemory
        );
    });

    it("Should be able to create a new rental", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car Name Test",
            description: "Car Description Test",
            daily_rate: 200,
            license_plate: "TEST",
            find_amount: 400,
            category_id: "1234",
            brand: "brand",
        });

        const rental = await createRentalUseCase.execute({
            user_id: "12345",
            car_id: car.id,
            expected_return_date: dayAdd24Hours,
        });

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });

    it("Should not be able to create a new rental, if there is another open to the same user", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "54321",
                expected_return_date: dayAdd24Hours,
            });

            await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "54321",
                expected_return_date: dayAdd24Hours,
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Should not be able to create a new rental with invalid return time", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "12675",
                car_id: "test",
                expected_return_date: dayjs().toDate(),
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
