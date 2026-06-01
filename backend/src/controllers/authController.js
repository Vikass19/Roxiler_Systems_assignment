import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";
import dotenv from "dotenv";

dotenv.config();

const tokenBlacklist = new Set();

export const signup = async (req, res) => {
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
    res.status(500).json({
      message: "Signup failed",
      error: err.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        address: user.address,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: "Login failed",
      error: err.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(400).json({
        message: "No token provided",
      });
    }

    tokenBlacklist.add(token);

    res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Logout failed",
    });
  }
};

export const isTokenBlacklisted = (token) => {
  return tokenBlacklist.has(token);
};