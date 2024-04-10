import express from "express";
import { applyDiscount, createPaymentIntent, deleteCouponById, getAllCoupons, NewCoupon } from "../controllers/payment.js";
import { adminOnly } from "../middlewares/auth.js";

const router = express.Router();

router.post("/create",createPaymentIntent);
router.get("/discount",applyDiscount);
router.post("/coupon/new",adminOnly,NewCoupon);
router.get("/coupon/all",adminOnly,getAllCoupons);
router.delete("/coupon/:id",adminOnly,deleteCouponById);

export default router;