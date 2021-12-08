import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
} from "typeorm";

import { User } from "./User";

@Entity("users_tokens")
class UserTokens {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    refresh_token: string;

    @Column()
    user_id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: "user_id" })
    user: User;

    @Column()
    expires_date: Date;

    @CreateDateColumn()
    created_at: Date;
}

export { UserTokens };
