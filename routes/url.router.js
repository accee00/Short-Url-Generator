import { Router } from "express";
import { handleGenerateShortUrl, redirectFromShortUrl, getAnalyticsofShortUrl } from "../controller/url.controller.js";

const router = Router()

router.route('/').post(handleGenerateShortUrl)

router.route('/:shortId').get(redirectFromShortUrl)

router.route('/:shortId/analytics').get(getAnalyticsofShortUrl)

export default router