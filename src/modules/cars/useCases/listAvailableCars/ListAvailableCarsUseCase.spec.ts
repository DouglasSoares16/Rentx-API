import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(
            carsRepositoryInMemory
        );
    });

    it("Should be able to list all available cars", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car 1",
            description: "Car description",
            daily_rate: 110,
            license_plate: "REF-1212",
            find_amount: 80,
            brand: "Car brand",
            category_id: "category_id",
        });

        const cars = await listAvailableCarsUseCase.execute({});

        expect(cars).toEqual([car]);
    });

    it("Should be able to list all available cars by brand", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car 2",
            description: "Car description",
            daily_rate: 110,
            license_plate: "REF-1212",
            find_amount: 80,
            brand: "Car brand test",
            category_id: "category_id",
        });

        const cars = await listAvailableCarsUseCase.execute({
            brand: "Car brand test",
        });

        expect(cars).toEqual([car]);
    });

    it("Should be able to list all available cars by name", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car 3",
            description: "Car description",
            daily_rate: 110,
            license_plate: "REF-1262",
            find_amount: 80,
            brand: "Car brand test",
            category_id: "category_id",
        });

        const cars = await listAvailableCarsUseCase.execute({
            name: "Car 3",
        });

        expect(cars).toEqual([car]);
    });

    it("Should be able to list all available cars by category", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car 4",
            description: "Car description",
            daily_rate: 110,
            license_plate: "REF-1102",
            find_amount: 80,
            brand: "Car brand test",
            category_id: "sheesh",
        });

        const cars = await listAvailableCarsUseCase.execute({
            category_id: "sheesh",
        });

        expect(cars).toEqual([car]);
    });
});
