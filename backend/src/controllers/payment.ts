import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../middlewares/error.js";
import { ApplyDiscountQuery, NewCouponRequestBody } from "../types/types.js";
import { Coupon } from "../models/coupon.js";
import ErrorHandler from "../utils/utility-class.js";
import { stripe } from "../app.js";

// create payment intent
export const createPaymentIntent = TryCatch(
    async (req:Request, res:Response, next:NextFunction) => {
        const { amount } = req.body;

        if(!amount) return next(new ErrorHandler("Plase enter amount.",400));

        const paymentIntent = await stripe.paymentIntents.create({
            amount: Number(amount) * 100,
            currency: "inr"
        })        

        return res.status(201).json({
            success: true,
            clientSecret: paymentIntent.client_secret
        })
    }
)

// new coupon
export const NewCoupon = TryCatch(
    async (req:Request, res:Response, next:NextFunction) => {
        const { code, amount } = req.body;

        if(!code || !amount) return next(new ErrorHandler("Plase enter both coupon & amount.",400));

        await Coupon.create({
            code,
            amount
        })

        return res.status(200).json({
            success: true,
            message: `Coupon ${code} Created Successfully.`
        })
    }
)

// apply discount
export const applyDiscount = TryCatch(
    async (req:Request<{},{},{},ApplyDiscountQuery>, res,next) => {
        const { code } = req.query;
        const discount = await Coupon.findOne({ code });
        if(!discount) return next(new ErrorHandler("Invalid coupon code.",400));

        return res.status(200).json({
            success: true,
            discount: discount.amount
        })
    }
)

// get all coupons
export const getAllCoupons = TryCatch(
    async (req,res,next) => {
        const coupons = await Coupon.find({});
        if(!coupons) return next(new ErrorHandler("Coupons not Found !",404));
        return res.status(200).json({
            success: true,
            coupons
        })
    }
)

// delete coupon by id
export const deleteCouponById = TryCatch(
    async (req,res,next) => {
        const id = req.params.id;
        const coupon = await Coupon.findByIdAndDelete(id);
        if(!coupon) return next(new ErrorHandler("Coupon not Found !",404));
        return res.status(200).json({
            success: true,
            message: `Coupon ${coupon.code} Deleted Successfully.`
        })
    }
)