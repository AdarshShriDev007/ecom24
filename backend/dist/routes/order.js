import express from "express";
import { deleteOrderById, getAllOrders, getMyOrders, getOrderById, newOrder, processOrder } from "../controllers/order.js";
const router = express.Router();
router.post("/new", newOrder);
router.get("/my", getMyOrders);
router.get("/all", getAllOrders);
router.route("/:id").get(getOrderById).put(processOrder).delete(deleteOrderById);
export default router;
