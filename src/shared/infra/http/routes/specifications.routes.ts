import { Router } from "express";

import { CreateSpecificationController } from "@modules/cars/useCases/createSpecifications/CreateSpecificationController";
import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

const specificationsRouter = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRouter.post(
    "/",
    ensureAuthenticated,
    ensureAdmin,
    createSpecificationController.handle
);

export { specificationsRouter };
