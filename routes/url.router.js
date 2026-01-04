import { Router } from "express";
import { handleGenerateShortUrl, redirectFromShortUrl, getAnalyticsofShortUrl } from "../controller/url.controller.js";
import { rateLimit } from '../utils/rate.limiter.js'
const router = Router()

router.route('/').post(rateLimit, handleGenerateShortUrl)

router.route('/:shortId').get(redirectFromShortUrl)

router.route('/:shortId/analytics').get(getAnalyticsofShortUrl)

export default router