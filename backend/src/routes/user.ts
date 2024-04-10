import express from "express";
import { newUser, getAllUsers, getUserById, deleteUserById } from "../controllers/user.js";
import { adminOnly } from "../middlewares/auth.js";

const router = express.Router();

router.post("/new",newUser);
router.get("/all", getAllUsers);

router.route("/:id").get(getUserById).delete(deleteUserById);

export default router;

