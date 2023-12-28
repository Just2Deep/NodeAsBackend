import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    subscribeToChannel,
    unSubscribeToChannel,
} from "../controllers/subscription.controller.js";

const router = Router();

router.route("/subscribe/:username").post(verifyJWT, subscribeToChannel);
router.route("/unsubscribe/:username").post(verifyJWT, unSubscribeToChannel);

export default router;
