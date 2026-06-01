
import bcrypt from "bcrypt";
import prisma from "../config/prisma.js";


export const createUser = async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        address,
        role,
      },
    });

    res.status(201).json({
      message: "User created",
      user,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Could not create user",
      error: err.message,
    });
  }
};


export const getAllUsers = async (req, res) => {
  try {
    const { name, email, address, role } = req.query;

    const users = await prisma.user.findMany({
      where: {
        name: name
          ? {
              contains: name,
            }
          : undefined,

        email: email
          ? {
              contains: email,
            }
          : undefined,

        address: address
          ? {
              contains: address,
            }
          : undefined,

        role: role ? role : undefined,
      },
    });

    res.status(200).json(users);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to fetch users",
      error: err.message,
    });
  }
};


export const updatePassword = async (req, res) => {
  try {
    const { password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        password: hashedPassword,
      },
    });

    res.status(200).json({
      message: "Password updated",
      updatedUser,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to update password",
      error: err.message,
    });
  }
};