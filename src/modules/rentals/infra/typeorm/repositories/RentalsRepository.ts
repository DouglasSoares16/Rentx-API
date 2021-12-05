import { getRepository, Repository } from "typeorm";

import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";

import { Rental } from "../entities/Rental";

class RentalsRepository implements IRentalsRepository {
    private repository: Repository<Rental>;

    constructor() {
        this.repository = getRepository(Rental);
    }

    async findById(rental_id: string): Promise<Rental> {
        const rental = await this.repository.findOne(rental_id);

        return rental;
    }

    async create({
        expected_return_date,
        user_id,
        car_id,
        id,
        end_date,
        total,
    }: ICreateRentalDTO): Promise<Rental> {
        const rental = this.repository.create({
            expected_return_date,
            user_id,
            car_id,
            id,
            end_date,
            total,
        });

        await this.repository.save(rental);

        return rental;
    }
    async findOpenRentalByCar(car_id: string): Promise<Rental> {
        const openByCar = await this.repository.findOne({
            where: {
                car_id,
                end_date: null,
            },
        });

        return openByCar;
    }
    async findOpenRentalByUser(user_id: string): Promise<Rental> {
        const findByUser = await this.repository.findOne({
            where: {
                user_id,
                end_date: null,
            },
        });

        return findByUser;
    }
}

export { RentalsRepository };
