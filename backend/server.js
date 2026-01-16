import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
dotenv.config();

import productRoutes from "./routes/productRoutes.js";
import { sql } from "./config/db.js";
import { aj } from "./lib/arcjet.js";

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

// Trust proxy to get correct IP addresses
app.set('trust proxy', true);

app.use(express.json());
app.use(cors());
app.use(helmet({
    contentSecurityPolicy: false,
}));

app.use(morgan("dev"));

//this is rate limiting ka logic - apply arcjet rate-limit to all routes
app.use(async (req,res,next)=>{
    try {
        const decision=await aj.protect(req,{
            requested:1,
        });

        if(decision.isDenied()){
            if(decision.reason.isRateLimit()){
                return res.status(429).json({error:"Too Many Requests"});
            }else if(decision.reason.isBot()){
                return res.status(403).json({error:"Bot access denied"});
            }else{
                return res.status(403).json({error:"Forbidden"});
            }
        }

        if(decision.results.some((result)=>result.reason.isBot() && result.reason.isSpoofed() )){
            return res.status(403).json({error:"Spoofed bot detected"});
        }
        next()        
    } catch (error) {
        console.log("Arcjet error:",error);
        next(error);
    }
});

app.use('/api/products',productRoutes);

if (process.env.NODE_ENV === "production") {
  // serve our react app
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}


async function initDB() {
    try {
        await sql`
        CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`;
        console.log("Database intialized successfully");
    } catch (error) {
        console.log("initDB error",error.message);
    }
}

initDB().then(()=>
    app.listen(PORT,()=>{
    console.log("server is runnig on port " + PORT);
})
);
