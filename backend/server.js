import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import productRoutes from "./routes/productRoutes.js";
import { sql } from "./config/db.js";

const app = express();
const PORT = process.env.PORT || 3000;
// console.log(PORT);

app.use(helmet());  //provides various http headers and security middleware samjhe
//middlewares 
app.use(express.json());
app.use(cors());




app.use(morgan("dev")); //log the requests kitna time laga hai konsa response code hai karke

app.use('/api/products',productRoutes);

async function initDB() {
    try {
        await sql`
        
        `
    } catch (error) {
        console.log("initDB error");
    }
}

app.get("/",(req,res)=>{
    // console.log(res.getHeaders());  //just to see what headers are there for security and all 
    res.send("hello from the backend ")
});

app.listen(PORT,()=>{
    console.log("server is runnig on port " + PORT)
});