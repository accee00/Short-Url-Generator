import { Router } from "express";
import { handleGenerateShortUrl, redirectFromShortUrl, getAnalyticsofShortUrl } from "../controller/url.controller.js";
import { createUrlLimiter } from '../utils/rate.limiter.js'
const router = Router()

router.route('/').post(createUrlLimiter, handleGenerateShortUrl)

router.route('/:shortId').get(redirectFromShortUrl)

router.route('/:shortId/analytics').get(getAnalyticsofShortUrl)

export default router