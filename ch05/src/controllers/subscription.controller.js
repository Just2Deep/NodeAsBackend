import { Subscription } from "../models/subscription.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const subscribeToChannel = asyncHandler(async (req, res) => {
    const channelUsername = req.params["username"];

    if (!channelUsername) {
        throw new ApiError(400, "channel username is required");
    }

    const channel = await User.findOne({ username: channelUsername });

    if (!channel) {
        throw new ApiError(404, "channel does not exist");
    }

    if (channel.username == req.user?.username) {
        throw new ApiError(400, "channel and subsriber cannot be same");
    }

    const isSubscribed = await Subscription.findOne({
        subscriber: req.user?._id,
        channel: channel._id,
    });

    if (isSubscribed) {
        throw new ApiError(400, "Already subscribed to this channel");
    }

    const subscribed = await Subscription.create({
        subscriber: req.user?._id,
        channel: channel._id,
    });

    return res
        .status(201)
        .json(
            new ApiResponse(201, subscribed, "Subscription added successfully!")
        );
});

const unSubscribeToChannel = asyncHandler(async (req, res) => {
    const channelUsername = req.params["username"];

    if (!channelUsername) {
        throw new ApiError(400, "channel username is required");
    }

    const channel = await User.findOne({ username: channelUsername });

    if (!channel) {
        throw new ApiError(404, "channel does not exist");
    }

    if (channel.username == req.user?.username) {
        throw new ApiError(400, "channel and subsriber cannot be same");
    }

    const unsubscribe = await Subscription.findOneAndDelete({
        subscriber: req.user?._id,
        channel: channel._id,
    });

    if (!unsubscribe) {
        throw new ApiError(500, "could not find subscription");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "unsubscribed successfully!"));
});

export { subscribeToChannel, unSubscribeToChannel };
