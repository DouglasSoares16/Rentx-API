import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

@injectable()
class DevolutionRentalUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalRepository: IRentalsRepository,

        @inject("CarsRepository")
        private carRepository: ICarsRepository,

        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ) {}

    async execute(rental_id: string): Promise<Rental> {
        const rental = await this.rentalRepository.findById(rental_id);
        const car = await this.carRepository.findById(rental.car_id);

        const minimum_daily = 1;
        let total = 0;

        if (!rental) {
            throw new AppError("Rental does not exists", 404);
        }

        const dateNow = this.dateProvider.dateNow();

        let daily = this.dateProvider.compareInDays(rental.start_date, dateNow);

        if (daily <= 0) {
            daily = minimum_daily;
        }

        const delay = this.dateProvider.compareInDays(
            dateNow,
            rental.expected_return_date
        );

        if (delay > 0) {
            const calculate_fine = delay * car.find_amount;

            total = calculate_fine;
        }

        total += daily * car.daily_rate;

        rental.end_date = dateNow;
        rental.total = total;

        await this.rentalRepository.create(rental);
        await this.carRepository.updateStatus(car.id, true);

        return rental;
    }
}

export { DevolutionRentalUseCase };
