import bcrypt from "bcrypt";
import prisma from "../config/prisma.js";
import dotenv from "dotenv";

dotenv.config();

export const Signup = async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body;

    
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email, and password are required",
      });
    }

   
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }

    
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
      message: "User created successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        address: user.address,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Signup Error:", err);

    res.status(500).json({
      message: "Signup failed",
      error: err.message,
    });
  }
};