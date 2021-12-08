import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import auth from "@config/auth";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
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

    const userTokensRepository = new UsersTokensRepository();

    if (!authHeader) {
        throw new AppError("Token missing!", 401);
    }

    const [, token] = authHeader.split(" ");

    try {
        const { sub: user_id } = verify(
            token,
            auth.secret_refresh_token
        ) as IPayload;

        const user = await userTokensRepository.findByUserIdAndRefreshToken(
            user_id,
            token
        );

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
