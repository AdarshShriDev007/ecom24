import express from "express";
import userRouter from "./routes/user.js";
import productRouter from "./routes/products.js";
import orderRouter from "./routes/order.js";
import paymentRouter from "./routes/payment.js";
import dashboardRouter from "./routes/stats.js";
import { connectDB } from "./utils/features.js";
import { errorMiddleware } from "./middlewares/error.js";
import NodeCache from "node-cache";
import { config } from "dotenv";
import morgan from "morgan";
import Stripe from "stripe";
config({
    path: "./.env"
});
const port = process.env.PORT || 3000;
const mongo_db = process.env.MONGODB_URI || "";
const stripeKey = process.env.STRIPE_KEY || "";
connectDB(mongo_db);
export const myCache = new NodeCache();
export const stripe = new Stripe(stripeKey);
const app = express();
app.get("/", (req, res) => {
    res.send("API Working with /api/v1");
});
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/payment", paymentRouter);
app.use("/api/v1/dashboard", dashboardRouter);
app.use("/uploads", express.static("uploads"));
app.use(errorMiddleware);
app.listen(port, () => {
    console.log(`express is running on http://localhost:${port}`);
});
