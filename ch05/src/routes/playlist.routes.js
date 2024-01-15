import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    createNewPlaylist,
    updatePlaylistDetails,
    addVideoToPlaylist,
    deletePlaylist,
    removeVideoFromPlaylist,
    getPlaylist,
} from "../controllers/playlist.controller.js";

const router = Router();

router.use(verifyJWT);

router.route("/new").post(createNewPlaylist);
router.route("/get/:playlistId").get(getPlaylist);
router.route("/add-video/:playlistId").patch(addVideoToPlaylist);
router.route("/remove-video/:playlistId").patch(removeVideoFromPlaylist);
router.route("/update/:playlistId").patch(updatePlaylistDetails);
router.route("/delete/:playlistId").delete(deletePlaylist);

export default router;
