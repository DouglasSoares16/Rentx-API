import { Router } from "express";

import { authenticateRouter } from "./authenticate.routes";
import { carRouter } from "./cars.routes";
import { categoriesRoutes } from "./categories.routes";
import { passwordRoutes } from "./password.routes";
import { rentalRouter } from "./rentals.routes";
import { specificationsRouter } from "./specifications.routes";
import { userRouter } from "./users.routes";

const router = Router();

router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationsRouter);
router.use("/users", userRouter);
router.use("/cars", carRouter);
router.use(authenticateRouter);
router.use("/rentals", rentalRouter);
router.use("/password", passwordRoutes);

export { router };
