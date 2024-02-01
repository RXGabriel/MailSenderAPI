import { Router } from "express";

import * as ApiController from "../controller/apiController";
import * as EmailController from "../controller/emailController";

const router = Router();

router.get("/ping", ApiController.ping);

router.post("/contato", EmailController.constato);

export default router;
