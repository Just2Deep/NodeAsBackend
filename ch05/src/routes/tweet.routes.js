import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    createNewTweet,
    deleteTweet,
    getAllTweetsByUser,
    getTweet,
    updateTweet,
} from "../controllers/tweet.controller.js";

const router = Router();

router.route("/new").post(verifyJWT, createNewTweet);
router.route("/get/:tweetId").get(getTweet);
router.route("/get-all/:userId").get(getAllTweetsByUser);
router.route("/delete/:tweetId").delete(verifyJWT, deleteTweet);
router.route("/update/:tweetId").patch(verifyJWT, updateTweet);

export default router;
