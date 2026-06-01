
import express from "express"
import cors from "cors"

import authRoutes from "./routes/authRoutes.js"
import storeRoutes from "./routes/storeRoutes.js"
import ratingRoutes from "./routes/ratingRoutes.js"
import userRoutes from "./routes/userRoutes.js"

const app = express()

app.use(cors())
app.use(express.json())


app.use("/api/v1/auth" , authRoutes);
app.use("/api/v1/auth/users" , userRoutes);
app.use("/api/v1/stores", storeRoutes);
app.use("/api/v1/ratings", ratingRoutes);


app.get("/" , (req , res)=>{
    res.json({message : "backend is running"})
})

export default app;