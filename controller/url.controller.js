import { nanoid } from "nanoid";
import { URL } from "../models/url.model.js";

const handleGenerateShortUrl = async (req, res) => {
    try {
        const { url } = req.body;

        if (!url) {
            return res.status(400).json({
                error: "URL is required",
            });
        }

        const shortId = nanoid(8);

        await URL.create({
            shortId,
            redirectUrl: url,
            visitHistory: [],
        });

        return res.status(201).json({
            shortId,
        });
    } catch (error) {
        return res.status(500).json({
            error: "Failed to create short URL",
        });
    }
};

const redirectFromShortUrl = async (req, res) => {
    try {
        const { shortId } = req.params;

        const result = await URL.findOneAndUpdate(
            { shortId },
            {
                $push: {
                    visitHistory: {
                        timestamp: new Date(),
                    },
                },
            },
            { new: true }
        );

        if (!result) {
            return res.status(404).json({
                error: "Short URL not found",
            });
        }

        return res.redirect(302, result.redirectUrl);
    } catch (error) {
        return res.status(500).json({
            error: "Redirect failed",
        });
    }
};

const getAnalyticsofShortUrl = async (req, res) => {
    try {
        const { shortId } = req.params;

        if (!shortId) {
            return res.status(400).json({
                error: "ShortId is required",
            });
        }

        const result = await URL.findOne({ shortId });

        if (!result) {
            return res.status(404).json({
                error: "Short URL not found",
            });
        }

        return res.status(200).json({
            totalClicks: result.visitHistory.length,
            visitHistory: result.visitHistory,
        });
    } catch (error) {
        return res.status(500).json({
            error: "Failed to fetch analytics",
        });
    }
};

export {
    handleGenerateShortUrl,
    redirectFromShortUrl,
    getAnalyticsofShortUrl,
};
