import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/utility-class.js";
import { ControllerType } from "../types/types.js";


export const errorMiddleware = (err:ErrorHandler, req: Request, res: Response, Next: NextFunction) => {

    let message = err.message || "Internal server error";
    const status = err.statusCode || 500;

    if(err.name === "CastError") message = err.message = "Invalid ID";

    return res.status(status).json({
        success:false,
        message: message
    })
}

export const TryCatch = (func:ControllerType) => (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(func(req, res, next)).catch(next);
}