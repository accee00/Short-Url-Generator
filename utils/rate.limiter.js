import rateLimit from "express-rate-limit";

export const createUrlLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
});
