import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError("Token missing!", 401);
    }

    const [, token] = authHeader.split(" ");

    try {
        const { sub: user_id } = verify(
            token,
            "ff8139ffc3af454ff1f488ed14008aba"
        ) as IPayload;

        const userRepository = new UsersRepository();

        const user = await userRepository.findById(user_id);

        if (!user) {
            throw new AppError("User does not exists!", 404);
        }

        request.user = {
            id: user_id,
        };

        return next();
    } catch {
        throw new AppError("Invalid Token!", 401);
    }
}
