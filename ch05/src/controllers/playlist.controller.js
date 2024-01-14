import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { Playlist } from "../models/playlist.model";
import { asyncHandler } from "../utils/asyncHandler";
import mongoose from "mongoose";

const createNewPlaylist = asyncHandler(async (req, res) => {
    const { playlistName, playlistDescription } = req.body;

    if (!playlistName) {
        throw new ApiError(400, "name is required!");
    }

    const playlist = await Playlist.create({
        name: playlistName,
        description: playlistDescription || "",
        owner: req.user?._id,
    });

    if (!playlist) {
        throw new ApiError(500, "some error while creating playlist");
    }

    return res
        .status(201)
        .json(new ApiResponse(201, playlist, "playlist created successfully!"));
});

const addVideoToPlaylist = asyncHandler(async (req, res) => {
    const { playlistId } = req.params;
    const { videoId } = req.body;

    if (!videoId || !playlistId) {
        throw new ApiError(400, "all fields are required");
    }

    if (
        !mongoose.isValidObjectId(videoId) ||
        !mongoose.isValidObjectId(playlistId)
    ) {
        throw new ApiError(400, "Incorrect data");
    }

    const playlistToAdd = await Playlist.findOne({
        _id: playlistId,
        owner: req.user?._id,
    });

    if (!playlistToAdd) {
        throw new ApiError(400, "playlist does not exist");
    }

    const updatedPlaylist = await Playlist.findByIdAndUpdate(playlistId, {
        $addToSet: {
            videos: videoId,
        },
    });

    if (!updatedPlaylist) {
        throw new ApiError(500, "error while updating playlist");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, updatedPlaylist, "video added to playlist"));
});

const updatePlaylistDetails = asyncHandler(async (req, res) => {
    const { playlistId } = req.params;
    const { playlistName, playlistDescription } = req.body;

    if (!playlistName || !playlistDescription) {
        throw new ApiError(400, "all fields are required");
    }

    if (!mongoose.isValidObjectId(playlistId)) {
        throw new ApiError(400, "Incorrect playlist id");
    }

    const playlistToUpdate = await Playlist.findOneAndUpdate(
        {
            _id: playlistId,
            owner: req.user?._id,
        },
        {
            $set: {
                name: playlistName,
                description: playlistDescription,
            },
        }
    );

    if (!playlistToUpdate) {
        throw new ApiError(400, "playlist does not exist");
    }
    return res
        .status(200)
        .json(
            new ApiResponse(200, playlistToUpdate, "playlist details updated")
        );
});

const getPlaylist = asyncHandler(async (req, res) => {
    const { playlistId } = req.params;

    if (!mongoose.isValidObjectId(playlistId)) {
        throw new ApiError(400, "Incorrect playlist id");
    }

    const playlist = await Playlist.findOne({
        _id: playlistId,
        owner: req.user?._id,
    });

    if (!playlist) {
        throw new ApiError(400, "playlist does not exist");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, playlist, "playlist data fetched successfully")
        );
});

export {
    createNewPlaylist,
    addVideoToPlaylist,
    updatePlaylistDetails,
    getPlaylist,
};
