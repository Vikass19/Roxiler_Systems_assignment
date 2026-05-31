
import express from "express"
import cors from "cors"


const app = express()

app.use(cors())

app.get("/" , (req , res)=>{
    res.json({message : "backend is running"})
})

export default app;