import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    createNewPlaylist,
    updatePlaylistDetails,
    addVideoToPlaylist,
} from "../controllers/playlist.controller.js";

const router = Router();

router.route("/new").post(verifyJWT, createNewPlaylist);
router.route("/get/:playlistId").get(verifyJWT, getPlaylist);
router.route("/add-video/:playlistId").delete(verifyJWT, addVideoToPlaylist);
router.route("/update/:playlistId").patch(verifyJWT, updatePlaylistDetails);

export default router;
