import rateLimit from 'express-rate-limit'

export const forgotPasswordLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3,
  message: { message: "Too many reset requests. Try again after 15 minutes." },
  standardHeaders: true,
  legacyHeaders: false,
})