
import prisma from "../config/prisma.js";


export const createStore = async (req, res) => {
  try {
    const { name, email, address, ownerId } = req.body;

   
    const owner = await prisma.user.findUnique({
      where: {
        id: Number(ownerId),
      },
    });

    if (!owner || owner.role !== "STORE_OWNER") {
      return res.status(400).json({
        message: "Invalid ownerId or user is not a store owner",
      });
    }

    const store = await prisma.store.create({
      data: {
        name,
        email,
        address,
        owner: {
          connect: {
            id: Number(ownerId),
          },
        },
      },
    });

    res.status(201).json({
      message: "Store created successfully",
      store,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to create store",
      error: err.message,
    });
  }
};


export const getStoreById = async (req, res) => {
  try {
    const { id } = req.params;

    const store = await prisma.store.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!store) {
      return res.status(404).json({
        message: "Store not found",
      });
    }

    res.status(200).json(store);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to fetch store",
      error: err.message,
    });
  }
};

// Get All Stores
export const getAllStores = async (req, res) => {
  try {
    const stores = await prisma.store.findMany({
      include: {
        owner: true,
        ratings: true,
      },
    });

    res.status(200).json(stores);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to fetch stores",
      error: err.message,
    });
  }
};


export const submitRating = async (req, res) => {
  try {
    const storeId = Number(req.params.id);
    const { value } = req.body;
    const userId = req.user.id;

    const rating = await prisma.rating.upsert({
      where: {
        userId_storeId: {
          userId,
          storeId,
        },
      },
      update: {
        value: Number(value),
      },
      create: {
        userId,
        storeId,
        value: Number(value),
      },
    });

    res.status(200).json({
      message: "Rating submitted successfully",
      rating,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to submit rating",
      error: err.message,
    });
  }
};


export const getStoreRatings = async (req, res) => {
  try {
    const { storeId } = req.params;

    const ratings = await prisma.rating.findMany({
      where: {
        storeId: Number(storeId),
      },
      include: {
        user: true,
      },
    });

    res.status(200).json(ratings);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to fetch ratings",
      error: err.message,
    });
  }
};