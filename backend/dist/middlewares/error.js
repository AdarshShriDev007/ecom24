export const errorMiddleware = (err, req, res, Next) => {
    let message = err.message || "Internal server error";
    const status = err.statusCode || 500;
    if (err.name === "CastError")
        message = err.message = "Invalid ID";
    return res.status(status).json({
        success: false,
        message: message
    });
};
export const TryCatch = (func) => (req, res, next) => {
    return Promise.resolve(func(req, res, next)).catch(next);
};
