import { inject, injectable } from "tsyringe";

import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    car_id: string;
    specifications_id: string[];
}

@injectable()
class CreateCarSpecificationUseCase {
    constructor(
        @inject("CarsRepository")
        private carRepository: ICarsRepository,

        @inject("SpecificationsRepository")
        private specificationRepository: ISpecificationsRepository
    ) {}

    async execute({ car_id, specifications_id }: IRequest): Promise<Car> {
        const carExists = await this.carRepository.findById(car_id);

        if (!carExists) {
            throw new AppError("Car does not exists", 404);
        }

        const specifications = await this.specificationRepository.findByIds(
            specifications_id
        );

        carExists.specifications = specifications;

        await this.carRepository.create(carExists);

        return carExists;
    }
}

export { CreateCarSpecificationUseCase };
