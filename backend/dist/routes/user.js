import express from "express";
import { newUser, getAllUsers, getUserById, deleteUserById } from "../controllers/user.js";
const router = express.Router();
router.post("/new", newUser);
router.get("/all", getAllUsers);
router.route("/:id").get(getUserById).delete(deleteUserById);
export default router;
