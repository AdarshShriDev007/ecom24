import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../middlewares/error.js";
import { Order } from "../models/order.js";
import { invalidateCache, reduceStock } from "../utils/features.js";
import ErrorHandler from "../utils/utility-class.js";
import { myCache } from "../app.js";
import { MyOrdersQuery } from "../types/types.js";

// get my orders
export const getMyOrders = TryCatch(async (req:Request<{},{},{},MyOrdersQuery>, res, next) => {
  const { id: user } = req.query;
  const key = `my-orders-${user}`;
  let orders = [];
  if (myCache.has(key)) orders = JSON.parse(myCache.get(key) as string);
  else {
    orders = await Order.find({ user });
    if (!orders) return next(new ErrorHandler("Orders not found !", 404));
    myCache.set(key, JSON.stringify(orders));
  }

  res.status(200).json({
    success: true,
    orders,
  });
});

// get all orders
export const getAllOrders = TryCatch(async (req, res, next) => {
  const key = "all-orders";
  let orders = [];
  if (myCache.has(key)) orders = JSON.parse(myCache.get(key) as string);
  else {
    orders = await Order.find().populate("user", "name");
    if (!orders) return next(new ErrorHandler("Orders not found !", 404));
    myCache.set(key, JSON.stringify(orders));
  }

  return res.status(200).json({
    success: true,
    orders,
  });
});

// get order by id
export const getOrderById = TryCatch(async (req, res, next) => {
  const { id } = req.params;
  const key = `order-${id}`;
  let order;
  if (myCache.has(key)) order = JSON.parse(myCache.get(key) as string);
  else {
    order = await Order.findById(id).populate("user", "name");
    if (!order) return next(new ErrorHandler("Order not found !", 404));
    myCache.set(key, JSON.stringify(order));
  }

  return res.status(200).json({
    success: true,
    order,
  });
});

// new order
export const newOrder = TryCatch(
  async (req: Request<{}, {}>, res: Response, next: NextFunction) => {
    const {
      shippingInfo,
      orderItems,
      user,
      subtotal,
      tax,
      shippingCharges,
      discount,
      total,
    } = req.body;

    if (
      !shippingInfo ||
      !orderItems ||
      !user ||
      !subtotal ||
      !tax ||
      !shippingCharges ||
      !discount ||
      !total
    ) {
      return next(new ErrorHandler("Please enter all fields.", 404));
    }

    const order = await Order.create({
      shippingInfo,
      orderItems,
      user,
      subtotal,
      tax,
      shippingCharges,
      discount,
      total,
    });

    await reduceStock(orderItems);
    invalidateCache({
      product: true,
      order: true,
      admin: true,
      userId: user,
      productId: order.orderItems.map((i) => String(i.productId))
    });

    return res.status(201).json({
      success: true,
      message: "Order Placed successfully",
    });
  }
);

// process order
export const processOrder = TryCatch(async (req, res, next) => {
  const { id } = req.params;
  const order = await Order.findById(id);
  if (!order) return next(new ErrorHandler("Order not found !", 404));

  switch (order.status) {
    case "Processing":
      order.status = "Shipped";
      break;
    case "Shipped":
      order.status = "Delivered";

    default:
      order.status = "Delivered";
      break;
  }

  await order.save();
  invalidateCache({
    product: false,
    order: true,
    admin: true,
    userId: order.user,
    orderId: String(order._id)
  });

  return res.status(200).json({
    success: true,
    message: "Order Processed Successfully",
  });
});

// delete order by id
export const deleteOrderById = TryCatch(async (req, res, next) => {
  const { id } = req.params;
  const order = await Order.findById(id);
  if (!order) return next(new ErrorHandler("Order not found !", 404));

  await order.deleteOne();
  invalidateCache({
    product: false,
    order: true,
    admin: true,
    userId: order.user,
    orderId: String(order._id)
  });

  return res.status(200).json({
    success: true,
    message: "Order Deleted Successfully",
  });
});
