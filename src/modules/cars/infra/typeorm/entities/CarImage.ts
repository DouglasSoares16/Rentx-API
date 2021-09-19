import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("cars_images")
class CarImage {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    car_id: string;

    @Column()
    image_name: string;

    @CreateDateColumn()
    created_at: string;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export { CarImage };
