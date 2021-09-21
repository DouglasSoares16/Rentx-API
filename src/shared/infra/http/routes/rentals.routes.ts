import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/userCases/createRental/CreateRentalController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const createRentalController = new CreateRentalController();

const rentalRouter = Router();

rentalRouter.post("/", ensureAuthenticated, createRentalController.handle);

export { rentalRouter };
