import { nanoid } from "nanoid";
import { URL } from "../models/url.model.js";

const handleGenerateShortUrl = async (req, res) => {
    const body = req.body
    if (!body.url) {
        return res.status(400).json({
            error: "Url is required"
        })
    }

    const shortId = nanoid(8)
    const result = await URL.create({
        shortId: shortId,
        redirectUrl: body.url,
        visitHistory: []
    })
    console.log(result)
    return res.status(201).json({
        shortId: shortId
    })
}

const redirectFromShortUrl = async (req, res) => {
    const shortId = req.params.shortId
    const result = await URL.findOneAndUpdate({
        shortId
    }, {
        $push: {
            visitHistory: {
                timestamp: Date.now()
            }
        }
    })
    res.redirect(result.redirectUrl)
}

const getAnalyticsofShortUrl = async (req, res) => {
    const shortId = req.params.shortId

    if (!shortId) {
        return res.status(400).json({
            error: "ShortId is required."
        })
    }
    const result = await URL.findOne({ shortId })

    return res.status(200).json({
        totalClicks: result.visitHistory.length,
        visitHistory: result.visitHistory
    })
}
export { handleGenerateShortUrl, redirectFromShortUrl, getAnalyticsofShortUrl }