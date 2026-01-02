import { Router } from "express";
import { handleGenerateShortUrl, redirectFromShortUrl } from "../controller/url.controller.js";

const router = Router()

router.route('/').post(handleGenerateShortUrl)
router.route('/:shortId').get(redirectFromShortUrl)
export default router