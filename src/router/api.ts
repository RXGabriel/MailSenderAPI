import { Router } from "express";

import * as ApiController from "../controller/apiController";

const router = Router();

router.post("/register", ApiController.register);
router.post("/login", ApiController.login);

router.get("/list", ApiController.list);

export default router;
