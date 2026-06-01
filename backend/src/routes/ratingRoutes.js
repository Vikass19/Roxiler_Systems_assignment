


import express from "express";
import {
  getAllStores,
  getStoreById,
  submitRating,
} from "../controllers/storeController.js";

import { authenticate } from "../middlerware/authMiddleware.js";

const router = express.Router();


router.get(
  "/",
  authenticate,
  getAllStores
);


router.get(
  "/:id",
  authenticate,
  getStoreById
);


router.post(
  "/:id/rate",
  authenticate,
  submitRating
);


router.put(
  "/:id/rate",
  authenticate
);

export default router;