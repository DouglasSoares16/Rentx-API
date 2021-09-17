import { Repository, getRepository } from "typeorm";

import {
    ISpecificationsRepository,
    ICreateSpecificationDTO,
} from "@modules/cars/repositories/ISpecificationsRepository";

import { Specification } from "../entities/Specification";

class SpecificationsRepository implements ISpecificationsRepository {
    private specifications: Repository<Specification>;

    constructor() {
        this.specifications = getRepository(Specification);
    }

    async create({
        name,
        description,
    }: ICreateSpecificationDTO): Promise<void> {
        const specification = this.specifications.create({ name, description });

        await this.specifications.save(specification);
    }

    async findByName(name: string): Promise<Specification> {
        const specification = await this.specifications.findOne({ name });

        return specification;
    }
}

export { SpecificationsRepository };
