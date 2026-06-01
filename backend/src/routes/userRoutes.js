
import express from "express";
import { createUser, getAllUsers, updatePassword } from "../controllers/userController.js";
import { authenticate, authorizeRoles } from "../middlerware/authMiddleware.js";

const router = express.Router();


router.post("/", authenticate, authorizeRoles("SYSTEM_ADMINISTRATOR"), createUser);
router.get("/", authenticate, authorizeRoles("SYSTEM_ADMINISTRATOR"), getAllUsers);


router.put("/password", authenticate, updatePassword);

export default router;