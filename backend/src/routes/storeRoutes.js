
import express from "express";
import {
  authenticate,
  authorizeRoles,
} from "../middlerware/authMiddleware.js";

import {
  createStore,
  getAllStores,
  submitRating,
  getStoreRatings,
} from "../controllers/storeController.js";

const router = express.Router();

router.get(
  "/",
  authenticate,
  getAllStores
);


router.get(
  "/:storeId/ratings",
  authenticate,
  getStoreRatings
);


router.post(
  "/",
  authenticate,
  authorizeRoles(
    "SYSTEM_ADMINISTRATOR",
    "STORE_OWNER"
  ),
  createStore
);


router.post(
  "/rating",
  authenticate,
  authorizeRoles("NORMAL_USER"),
  submitRating
);

export default router;