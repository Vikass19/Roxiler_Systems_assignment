
import prisma from "../config/prisma.js";

export const getAllStores = async () => {
  return prisma.store.findMany({
    include: {
      ratings: true,
      owner: true
    }
  });
};

export const createStore = async (data) => {
  return prisma.store.create({
    data
  });
};

export const submitRating = async ({ userId, storeId, value }) => {
  return prisma.rating.upsert({
    where: {
      userId_storeId: {
        userId,
        storeId
      }
    },
    update: {
      value
    },
    create: {
      userId,
      storeId,
      value
    }
  });
};