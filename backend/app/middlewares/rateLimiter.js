const rateLimit = require("express-rate-limit");

const rateLimiterUsingThirdParty = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hrs in milliseconds
  max: process.env.RATELIMITER,
  message: "You have exceeded the 1 requests in 24 hrs limit!",
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = rateLimiterUsingThirdParty;
