import { getRepository, Repository } from "typeorm";

import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

import { Car } from "../entities/Car";

class CarsRepository implements ICarsRepository {
    private repository: Repository<Car>;

    constructor() {
        this.repository = getRepository(Car);
    }

    async create({
        brand,
        find_amount,
        daily_rate,
        category_id,
        description,
        name,
        license_plate,
        specifications,
        id,
    }: ICreateCarDTO): Promise<Car> {
        const car = this.repository.create({
            brand,
            find_amount,
            daily_rate,
            category_id,
            description,
            name,
            license_plate,
            specifications,
            id,
        });

        await this.repository.save(car);

        return car;
    }
    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = await this.repository.findOne({
            license_plate,
        });

        return car;
    }

    async findAvailable(
        brand?: string,
        category_id?: string,
        name?: string
    ): Promise<Car[]> {
        const carsQuery = await this.repository
            .createQueryBuilder("c")
            .where("available = :available", { available: true });

        if (brand) {
            carsQuery.andWhere("brand = :brand", { brand });
        }

        if (category_id) {
            carsQuery.andWhere("category_id = :category_id", { category_id });
        }

        if (name) {
            carsQuery.andWhere("name = :name", { name });
        }

        const cars = await carsQuery.getMany();
        return cars;
    }

    async findById(car_id: string): Promise<Car> {
        const car = await this.repository.findOne(car_id);

        return car;
    }
}

export { CarsRepository };
