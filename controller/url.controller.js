import { nanoid } from "nanoid";
import { URL } from "../models/url.model.js";

async function handleGenerateShortUrl(req, res) {
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
    return res.json({
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

export { handleGenerateShortUrl, redirectFromShortUrl }