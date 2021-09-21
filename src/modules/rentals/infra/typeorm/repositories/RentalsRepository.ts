import { getRepository, Repository } from "typeorm";

import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";

import { Rental } from "../entities/Rental";

class RentalsRepository implements IRentalsRepository {
    private repository: Repository<Rental>;

    constructor() {
        this.repository = getRepository(Rental);
    }

    async create({
        expected_return_date,
        user_id,
        car_id,
    }: ICreateRentalDTO): Promise<Rental> {
        const rental = this.repository.create({
            expected_return_date,
            user_id,
            car_id,
        });

        await this.repository.save(rental);

        return rental;
    }
    async findOpenRentalByCar(car_id: string): Promise<Rental> {
        const openByCar = await this.repository.findOne({ car_id });

        return openByCar;
    }
    async findOpenRentalByUser(user_id: string): Promise<Rental> {
        const findByUser = await this.repository.findOne({ user_id });

        return findByUser;
    }
}

export { RentalsRepository };
