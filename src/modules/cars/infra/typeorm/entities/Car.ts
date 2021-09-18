import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToMany,
    ManyToOne,
    PrimaryColumn,
    JoinTable,
} from "typeorm";
import { v4 as uuid } from "uuid";

import { Category } from "./Category";
import { Specification } from "./Specification";

@Entity("cars")
class Car {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    daily_rate: number;

    @Column()
    available: boolean;

    @Column()
    license_plate: string;

    @Column()
    find_amount: number;

    @Column()
    brand: string;

    @Column()
    category_id: string;

    @ManyToOne(() => Category)
    @JoinColumn({ name: "category_id" })
    category: Category;

    @ManyToMany(() => Specification)
    @JoinTable({
        name: "specifications_cars",
        joinColumns: [{ name: "car_id" }],
        inverseJoinColumns: [{ name: "specification_id" }],
    })
    specifications: Specification[];

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuid();
            this.available = true;
        }
    }
}

export { Car };
